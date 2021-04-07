import React, { FC, useState, useEffect } from 'react';

import './App.css';
import Confirm from './Confirm';
import { Option } from './Dropdown';

import Form, { FormData } from './Form';

const Success: FC = () => (
  <div className="alert alert-success" role="alert">
    Success
  </div>
);

const Failure: FC<{ message?: string }> = ({ message }) => (
  <div className="alert alert-danger" role="alert">
    {message || 'Failure'}
  </div>
);

const Empty: FC = () => (
  <div className="alert alert-primary" role="alert">
    Empty List
  </div>
);

const App: FC = () => {
  const [step, setStep] = useState(1);
  const [confirmData, setConfirmData] = useState<Option[]>();
  const [cities, setCities] = useState();
  const [error, setError] = useState('');

  const fetchCities = async () => {
    try {
      const response = await fetch('http://localhost:5000/cities');
      const { data, status } = await response.json();
      if (status) {
        if (data.length > 0) {
          setCities(data);
        } else {
          setStep(4);
        }
      } else {
        setStep(0);
      }
    } catch (error) {
      setStep(0);
    }
  };

  const handleFormSuccess = (data: FormData): void => {
    setConfirmData([
      {
        id: 'name',
        label: data.name,
      },
      {
        id: 'surname',
        label: data.surname,
      },
      {
        id: 'ID',
        label: data.personalId,
      },
      {
        id: 'city',
        label: data.city.label,
      },
      {
        id: 'district',
        label: data.district.label,
      },
    ]);

    setStep(2);
  };

  const handleFormError = (message: string): void => {
    setStep(0);

    setError(message);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className="container">
      <main
        style={{
          margin: '0 auto',
        }}
        className="col-6"
      >
        <h1>Register a user</h1>

        {step === 1 && cities && (
          <Form cities={cities} onSuccess={handleFormSuccess} onError={handleFormError} />
        )}
        {step === 2 && (
          <Confirm list={confirmData} onConfirm={() => setStep(3)} onBack={() => setStep(1)} />
        )}
        {step === 3 && <Success />}
        {step === 0 && <Failure message={error} />}
        {step === 4 && <Empty />}
      </main>
    </div>
  );
};

export default App;
