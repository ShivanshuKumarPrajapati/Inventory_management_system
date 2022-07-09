import React from 'react'
import { useState } from 'react';
import { authenticate } from '../auth';
import { signin } from '../auth/helper/index';
import './AuthPage.css';

//redirect todo

const Signin = () => {
   const [data, setData] = useState({
     email: "",
     password: "",
       error: "",
     loading:false
   });

   const handleChange = (e) => {
     const name = e.target.name;
     const value = e.target.value;

     setData({ ...data, [name]: value });
   };
    
    const onSubmit = (e) => {
        e.preventDefault();
        setData({ ...data, error: false, loading: true });

        const { email, password } = data;
        signin({ email, password }).then(res => {
            if (res.error) {
                setData({ ...data, error: res.error, loading: false });
            }
            else {
                authenticate(data, () => {
                    setData({
                        ...data
                    })
                })
            }
        })
            .catch(err => {
                console.log('Signin request failed');
            });
    }
    
    const loadingMessage = () => {
        return (
            data.loading && (
                <div className="flex justify-center">
                    <div className="w-50">
                        <div class="bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 mb-3" role="alert">
                            loading....
                        </div>
                    </div>
                </div>
            )
        );
    }

    const errorMessage = () => {
      return (
        <div className="flex justify-center">
          <div className="w-50">
            <div
              className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3"
              role="alert"
              style={{ display: data.error ? "" : "none" }}
            >
              {data.error}
            </div>
          </div>
        </div>
      );
    };

    return (
        <div>
            {loadingMessage()}
            {errorMessage()}
        <form className="authForm">
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Enter email"
            onChange={handleChange}
            required
            className="authInput w-full"
          />
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Enter password"
            onChange={handleChange}
            required
            className="authInput w-full"
          />

          <button type="submit" className='authBtn' onClick={onSubmit}>Login</button>
        </form>
      </div>
    );
}

export default Signin