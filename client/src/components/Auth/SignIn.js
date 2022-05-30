import React, { useState, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { GoogleButton } from "react-google-button";
import { signin, signup, signupGoogle } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";

import "./SignIn.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const EmailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [enterConfirmField, setEnterConfirmField] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const confirmRef = useRef();

  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
    setError(false);
  };

  const location = useLocation();
  const LOCAL_STORAGE_KEY = "profile";
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  );
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
  }, [location]);

  useEffect(() => {
    const elem = confirmRef.current;
    let PasswordValidation =
      formData.password === formData.confirmPassword &&
      formData.confirmPassword.trim() !== "";

    setCheckPassword(PasswordValidation);
    if (elem) {
      if (checkPassword) {
        if (elem?.classList.contains("border-rose-500"))
          elem.classList.remove("border-rose-500", "border-2");
        if (!elem?.classList.contains("border-brightmint"))
          elem.classList.add("border-brightmint", "border-2");
      } else {
        if (elem.classList.contains("border-brightmint"))
          elem.classList.remove("border-brightmint", "border-2");
        if (!elem.classList.contains("border-rose-500"))
          elem.classList.add("border-rose-500", "border-2");
      }
    }
  }, [formData.confirmPassword, checkPassword, formData.password]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    if (e.target.name !== "confirmPassword") {
      if (e.target?.value.trim() === "") {
        if (e.target.classList.contains("border-brightmint"))
          e.target.classList.remove("border-brightmint", "border-2");
        if (!e.target.classList.contains("border-rose-500"))
          e.target.classList.add("border-rose-500", "border-2");
      } else {
        if (e.target.classList.contains("border-rose-500"))
          e.target.classList.remove("border-rose-500", "border-2");
        if (!e.target.classList.contains("border-brightmint"))
          e.target.classList.add("border-brightmint", "border-2");
      }
    } else {
      setEnterConfirmField(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      const newResult = await dispatch(signup(formData));
      if (newResult.error) {
        console.log(newResult);
        setError(true);
        setErrorMessage(newResult.error);
        return;
      }
      if (newResult) navigate("/");
    } else {
      const newResult = await dispatch(signin(formData));
      if (newResult.error) {
        console.log(newResult);
        setError(true);
        setErrorMessage(newResult.error);
        return;
      }
      console.log(newResult);
      dispatch({ type: AUTH, data: newResult });
      if (newResult) navigate("/");
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    const newResult = await dispatch(
      signupGoogle(
        {
          email: result?.email,
          firstName: result?.givenName,
          lastName: result?.familyName,
        },
        token
      )
    );
    try {
      dispatch({ type: AUTH, data: newResult });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () =>
    alert("Google Sign In was unsuccessful. Try again later");

  const classes = {
    btnLogin:
      "bg-white shadow-lg h-10 py-2 px-5 m-2 text-md text-grey-700 rounded border border-white focus:outline-none  hover:opacity-75",
  };

  function IsEmailValid() {
    const valid = EmailRegex.test(formData.email);
    console.log(valid);
  }

  return (
    <div className="h-full flex justify-center mt-5 ">
      <div className="w-full max-w-md m-autorounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          {isSignup ? "Welcome to our family!" : "Log in to your account"}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className={error ? "text-rose-500 mb-2" : "hidden"}>
            {error ? errorMessage : ""}
          </div>
          {isSignup && (
            <div className="flex justify-center">
              <input
                name="firstName"
                aria-label="First Name"
                onChange={handleChange}
                autoFocus={true}
                placeholder="First Name"
                value={formData.firstName}
                className={`w-full p-2 mr-2 relative text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-2`}
              />
              <input
                name="lastName"
                aria-label="Last Name"
                onChange={handleChange}
                placeholder="Last Name"
                value={formData.lastName}
                className={`w-full p-2 relative text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-2`}
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              type="email"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-2`}
              name="email"
              value={formData.email}
              placeholder="Your Email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <input
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-2`}
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          {isSignup && (
            <div>
              <label htmlFor="password" className="text-white">
                Confirm Password
              </label>
              <input
                ref={confirmRef}
                type="password"
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-2`}
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm Your Password"
                onChange={handleChange}
              />
              {!enterConfirmField ? (
                <></>
              ) : !checkPassword ? (
                <div className="text-rose-500">Password is not matched</div>
              ) : (
                <div className="text-brightmint">Password matched!</div>
              )}
            </div>
          )}
          {!isSignup ? (
            <div className="flex justify-between items-center mt-6">
              <button className="login-button" onClick={handleSubmit}>
                Login
              </button>
              {/* <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            render={(renderProps) => (
                            <GoogleButton 
                                    type="light"
                                    onClick={renderProps.onClick} 
                                    disabled={renderProps.disabled} 
                                    variant="contained"
                                    label="SIGN IN WITH GOOGLE"
                                    >
                                
                            </GoogleButton>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleError}
                            cookiePolicy="single_host_origin"
                        /> */}
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Google Login"
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <button className={classes.btnLogin} onClick={handleSubmit}>
                Sign Up
              </button>
            </div>
          )}
        </form>
        <div className="flex justify-center pt-2">
          <p>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              className="pl-2 text-purple hover:opacity-75"
              onClick={switchMode}
            >
              {isSignup ? "Sign In Here!" : "Sign Up Here!"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
