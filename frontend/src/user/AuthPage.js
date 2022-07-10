import React from 'react'
import { useState } from 'react'
import './AuthPage.css';

import Signup from './Signup';
import Signin from './Signin';
import Base from '../Base';

const AuthPage = () => {

  const [flag, setFlag] = useState(false);

  const authLayout = () => {
    return (
      <div className="authParent">
            <div className="authHeader">
              <button
                className={`text ${!flag ? "border" : ""}`}
                onClick={() => setFlag(false)}
              >
                Login
              </button>
              <button
                onClick={() => setFlag(true)}
                className={`text ${flag ? "border" : ""}`}
              >
                Signup
              </button>
            </div>
            <div>{flag ? <Signup /> : <Signin />}</div>
          </div>
    )
  }

  return (
    <Base>
    {authLayout()}
    </Base>
  );
}

export default AuthPage