import React, { FC, useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Dropdown, { Option } from './Dropdown';

export type FormData = {
  name: string;
  surname: string;
  personalId: string;
  city: Option | null | any;
  district: Option | null | any;
  agreement: boolean;
};

const defaultValues: FormData = {
  name: '',
  surname: '',
  personalId: '',
  city: null,
  district: null,
  agreement: false,
};

const validations: Yup.SchemaOf<FormData> = Yup.object({
  name: Yup.string().required().defined(),
  surname: Yup.string().required().defined(),
  personalId: Yup.string().required().defined(),
  city: Yup.object().nullable().required()?.defined(),
  district: Yup.object().nullable().required().defined(),
  agreement: Yup.boolean().oneOf([true]).required().defined(),
}).defined();

interface Props {
  cities: Option[] | undefined;
  onSuccess: (data: FormData) => void;
  onError: (message: string) => void;
}

const Form: FC<Props> = ({ cities, onSuccess, onError }) => {
  const [districts, setDistricts] = useState();
  const { register, handleSubmit, control, setValue, formState } = useForm<FormData>({
    resolver: yupResolver(validations),
    defaultValues,
  });
  const { errors } = formState;

  const onSubmit = async (values: FormData) => {
    const response = await fetch('http://localhost:5000/validate', {
      method: 'POST',
      body: JSON.stringify({
        ...values,
        city: values.city.id,
        district: values.district.id,
      }),
    });
    const { data, status } = await response.json();

    if (status) onSuccess(values);
    else onError(data);
  };

  const fetchDistricts = async (cityId: string) => {
    const response = await fetch(`http://localhost:5000/districts?cityId=${cityId}`);
    const { data } = await response.json();

    setDistricts(data);
  };

  return (
    <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="name">name</label>
        <input
          type="text"
          className={`form-control${errors.name ? ' is-invalid' : ''}`}
          id="name"
          placeholder="Enter name"
          {...register('name')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="exampleInputPassword1">surname</label>
        <input
          type="text"
          className={`form-control${errors.surname ? ' is-invalid' : ''}`}
          id="surname"
          placeholder="Enter surname"
          {...register('surname')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="personelId">ID</label>
        <input
          type="text"
          className={`form-control${errors.personalId ? ' is-invalid' : ''}`}
          id="personalId"
          placeholder="Personal ID"
          {...register('personalId')}
        />
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  list={cities}
                  error={errors.city}
                  name="city"
                  value={value}
                  onChange={(item: Option) => {
                    setValue('district', null);
                    onChange(item);

                    fetchDistricts(item.id);
                  }}
                />
              )}
            />
          </div>
          <div className="col-6">
            <Controller
              control={control}
              name="district"
              render={({ field: { value, onChange } }) => (
                <Dropdown
                  error={errors.district}
                  list={districts}
                  name="district"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="form-group form-check">
        <input
          {...register('agreement')}
          type="checkbox"
          className={`form-check-input${errors.agreement ? ' is-invalid' : ''}`}
          id="agreement"
        />
        <label className="form-check-label" htmlFor="agreement">
          Approve
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
