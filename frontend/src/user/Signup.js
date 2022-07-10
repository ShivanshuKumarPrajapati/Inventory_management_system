import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./AuthPage.css";

import {signup, authenticate,isAuthenticated} from './../auth/helper/index'


const Signup = () => {
    const navigate = useNavigate();
    const { user } = isAuthenticated();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData({ ...data, [name]: value });
    }

    const onSubmit = (e) => {
      e.preventDefault();
        setData({ ...data, error:'' });
        
        const { name, email, password } = data;

      signup({ name, email, password })
        .then((res) => {
          if (res.mssg) {
            console.log(res.mssg)
            setData({
              ...data,
              error: `${res.mssg}`,
              success:false
            })

            setTimeout(() => {
              setData({
                name: '',
                email: '',
                password:'',
                error:''
              })
            }, 3000);        

          } else {

            authenticate(res, () => {
              setData({
                ...data,
                name: "",
                email: "",
                password: "",
                error: "",
                success: true,
              });
            });
            

            setTimeout(() => {
              setData({
                success: ""
              });

              if(user) {
              navigate('/home/product');
              }
            }, 3000);
          }
        })
        .catch(() => {
          console.log("Error in Signup")
          setData({
            email: "",
            password: "",
            name:""
        })
        });
    };

    const successMessage = () => {
        return (
          <div className="flex justify-center">
            <div className="w-50">
              <div
                className="bg-greem-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3"
                role="alert"
                style={{ display: data.success ? "" : "none" }}
              >
                New account created successfully
              </div>
            </div>
          </div>
        );
    }

    const errorMessage = () => {
      return (
        <div className="flex justify-center">
          <div className="w-50">
            <div
              className={`bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-1 mt-2 `}
              role="alert"
              style={{ display: data.error ? "block" : "none" }}
            >
              {data.error}
            </div>
          </div>
        </div>
      );
    };


    return (
        <div>
            {successMessage()}
            {errorMessage()}
      <form className="authForm">
        <input
          type="text"
          name="name"
          value={data.name}
          placeholder="Enter name"
          onChange={handleChange}
          required
          className="authInput w-full"
        />
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
        <button type="submit" className="authBtn" onClick={onSubmit}>
          SignUp
        </button>
      </form>
        </div> 
    );
}

export default Signup