import React, { FC, useState } from 'react';
import Login from './Login';

import Main from './Main';

const App: FC = () => {
  const [login, setLogin] = useState(true);

  return login ? <Login onSuccess={() => setLogin(false)} /> : <Main />;
};

export default App;
