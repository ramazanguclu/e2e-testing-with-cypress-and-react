import React, { FC, Fragment } from 'react';
import { Option } from './Dropdown';

interface Props {
  list: Option[] | undefined;
  onConfirm: () => void;
  onBack: () => void;
}

const Confirm: FC<Props> = ({ list, onBack, onConfirm }) => {
  if (!list) return null;

  return (
    <>
      <h4>Confirmation</h4>

      <div id="confirm-step" className="card-body">
        <div className="card-text">
          <dl className="row">
            {list.map((item: Option) => (
              <Fragment key={item.id}>
                <dt className="col-sm-3 text-md-right">{item.id}</dt>
                <dd className="col-sm-9">{item.label}</dd>
              </Fragment>
            ))}
          </dl>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <button type="submit" onClick={onBack} className="btn btn-secondary">
            Cancel
          </button>
        </div>
        <div className="col-sm-6">
          <button type="submit" className="btn btn-primary" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default Confirm;
