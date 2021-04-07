import React, { FC } from 'react';

interface Props {
  onSuccess: () => void;
}

const Login: FC<Props> = ({ onSuccess }) => (
  <form
    style={{
      margin: '30% auto 0',
    }}
    className="col-sm-6"
  >
    <div className="form-group">
      <input type="email" className="form-control" id="email" placeholder="Enter email" />
    </div>

    <div className="form-group">
      <input type="password" className="form-control" id="password" placeholder="Password" />
    </div>

    <div className="d-flex justify-content-center">
      <button onClick={onSuccess} type="button" className="btn btn-primary btn-lg">
        Submit
      </button>
    </div>
  </form>
);

export default Login;
