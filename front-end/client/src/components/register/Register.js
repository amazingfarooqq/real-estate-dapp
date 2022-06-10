import React, { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { Header } from "../header/Header";
import "./register.css";
import axios from "axios";
import { TermsAndConditions } from "./TermsAndConditions";

export const Register = () => {
  const { baseUrl } = useAuth();

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);

  // states
  const [isCorporation, setIsCorporation] = useState();
  const [isAgency, setIsAgency] = useState();
  const [corporationName, setCorporationName] = useState("");
  const [notCorporationName, setNotCorporationName] = useState("");

  // all state values expcept some , they are written seperately
  const [inputValues, setInputValues] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    age: "",
    dob: "",
    address: "",
  });

  // console.log(inputValues.  dob);

  // console.log('corporation:',isCorporation);

  console.log("agency:", isAgency);
  // handle change for all except some - they are written seperatetly
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  // handle change for corporation
  const handleChangeOnIsCorporation = (e) => {
    if (e.target.value == "yes") {
      setIsCorporation(true);
      setNotCorporationName("");
    }
    if (e.target.value == "no") {
      setIsCorporation(false);
      setCorporationName("");
    }
  };
  const handleChangeOnIsAgency = (e) => {
    if (e.target.value == "yes") {
      setIsAgency("partOfAgency");
    }
    if (e.target.value == "no") {
      setIsAgency("notPartOfAgency");
    }
  };

  // handle change for corporation name
  const handleOnCorporationName = (e) => {
    if (isCorporation) {
      setCorporationName(e.target.value);
    }
  };

  // handle change for not corporation name
  const handleOnNotCorporationName = (e) => {
    if (!isCorporation) {
      setNotCorporationName(e.target.value);
    }
  };

  // handle on submitting form
  const HandleOnSubmit = async (e) => {
    e.preventDefault();

    setDisabled(true);
    if (inputValues.password !== inputValues.confirmPassword) {
      setError("passwords do not match");
      setDisabled(false);
      return;
    } else {
      let profileImage = document.getElementById("profileImage");
      let passportImage = document.getElementById("passportImage");
      let accepttermssignature = document.getElementById("accepttermssignature");

      // console.log(profileImage);
      // console.log(passportImage);

      let formData = new FormData();
      formData.append("profileImage", profileImage.files[0]);
      formData.append("passportImage", passportImage.files[0]);
      formData.append("accepttermssignature", accepttermssignature.files[0]);
      formData.append("email", inputValues.email.toLowerCase());
      formData.append("phoneNumber", inputValues.phoneNumber);
      formData.append("password", inputValues.password);
      formData.append("firstName", inputValues.firstName);
      formData.append("lastName", inputValues.lastName);
      formData.append("age", inputValues.age);
      formData.append("dob", inputValues.dob);
      formData.append("address", inputValues.address);
      formData.append("isCorporation", isCorporation);
      formData.append("corporationName", corporationName);
      formData.append("notCorporationName", notCorporationName);
      formData.append("isAgency", isAgency);

      console.log(formData);
      console.log(isAgency === "true");

      if (
        formData.get("profileImage") === "undefined" ||
        formData.get("passportImage") === "undefined" ||
        formData.get("accepttermssignature") === "undefined" ||
        !inputValues.email ||
        !inputValues.password ||
        !inputValues.firstName ||
        !inputValues.lastName ||
        !inputValues.phoneNumber ||
        !inputValues.age ||
        !inputValues.dob ||
        !inputValues.address ||
        !isAgency ||
        (!corporationName && !notCorporationName)
      ) {
        setError("Please Fill Complete Form");
        setDisabled(false);
      } else {
        console.log(formData.get("profileImage"));
        console.log(formData.get("passportImage"));

        axios({
          method: "post",
          url: `${baseUrl}/authregister`,
          data: formData,
        })
          .then((response) => {
            setDisabled(false);
            if (response.data.status == 200) {
              console.log(response.data.message);
              navigate("/login");
            }
            setError(response.data.message);
            return;
          })
          .catch((err) => {
            setDisabled(false);
            console.log(err);
            setError("error");
          });
      }
    }
  };

  return (
    <div>
      <Header />

      <div className="container-fluid my-5">
        <div className="row justify-content-center">
          <div
            className="col-12 col-md-8 registration_form"
            
          >
            <div className="row justify-content-center">
              {/* <img className='col-6 d-none d-lg-block p-0' src="https://images.pexels.com/photos/421655/pexels-photo-421655.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" /> */}

              <div className="col">
                <form onSubmit={HandleOnSubmit}>
                  <div className="row justify-content-center py-1">
                    <h1
                      className="text-start mt-5 mb-3 text-center"
                      style={{ fontSize: "100px", fontWeight: "1000" }}
                    >
                      Register
                    </h1>

                    <div className="col-10">
                      {error && <Alert variant="danger">{error}</Alert>}
                    </div>

                    <div className="col-10 py-1">
                      <label for="profileImage" className="form-label">
                        Profile Picture
                      </label>
                      <input
                        className="form-control form-control-lg"
                        id="profileImage"
                        name="profileImage"
                        type="file"
                      />
                    </div>

                    <div className="col-10 py-1">
                      <label for="passportImage" className="form-label">
                        Passport Copy
                      </label>
                      <input
                        className="form-control form-control-lg"
                        id="passportImage"
                        name="passportImage"
                        type="file"
                      />
                    </div>

                    {/* <input type="file" id='profileImage' name='profileImage'/>
                          <input type="file" id='passportImage' name='passportImage'/> */}

                    <input
                      placeholder="first name"
                      className="col-5 rounded fs-5 p-3 my-1"
                      type="text"
                      name="firstName"
                      value={inputValues.firstName}
                      onChange={handleInputChange}
                    />
                    <input
                      placeholder="last name"
                      className="col-5 rounded fs-5 p-3 my-1"
                      type="text"
                      name="lastName"
                      value={inputValues.lastName}
                      onChange={handleInputChange}
                    />
                    <input
                      placeholder="Email"
                      className="col-10 rounded fs-5 p-3 my-1"
                      type="email"
                      name="email"
                      value={inputValues.email}
                      onChange={handleInputChange}
                    />
                    <input
                      placeholder="Phone Number"
                      className="col-10 rounded fs-5 p-3 my-1"
                      type="number"
                      name="phoneNumber"
                      value={inputValues.phoneNumber}
                      onChange={handleInputChange}
                    />
                    <input
                      placeholder="Password"
                      className="col-5 rounded fs-5 p-3 my-1"
                      type="password"
                      name="password"
                      value={inputValues.password}
                      onChange={handleInputChange}
                    />
                    <input
                      placeholder="Confirm Password"
                      className="col-5 rounded fs-5 p-3 my-1"
                      type="password"
                      name="confirmPassword"
                      value={inputValues.confirmPassword}
                      onChange={handleInputChange}
                    />
                    <input
                      placeholder="Age"
                      className="col-5 rounded fs-5 p-3 my-1"
                      type="number"
                      name="age"
                      value={inputValues.age}
                      onChange={handleInputChange}
                    />
                    <input
                      placeholder="dob"
                      className="col-5 rounded fs-5 p-3 my-1"
                      type="date"
                      data-date-format="DD MMMM YYYY"
                      name="dob"
                      value={inputValues.dob}
                      onChange={handleInputChange}
                    />
                    <input
                      placeholder="address"
                      type="text"
                      className="col-10 fs-5 p-3 my-1"
                      name="address"
                      value={inputValues.address}
                      onChange={handleInputChange}
                    />

                    <div className="col-10 fs-5 px-3 mt-1">
                      <div>Is the property registered under a corporation?</div>
                      <span className="px-2">
                        <input
                          onChange={handleChangeOnIsCorporation}
                          type="radio"
                          value="yes"
                          id="yescorporation"
                          name="corporation"
                        />
                        <label htmlFor="yescorporation" className="px-1">
                          Yes
                        </label>
                      </span>
                      <span className="px-2">
                        <input
                          onChange={handleChangeOnIsCorporation}
                          type="radio"
                          value="no"
                          id="nocorporation"
                          name="corporation"
                        />
                        <label htmlFor="nocorporation" className="px-1">
                          No
                        </label>
                      </span>
                    </div>

                    {isCorporation === true && (
                      <input
                        placeholder="Corporation Name"
                        type="text"
                        className="col-10 fs-5 p-3 mb-2"
                        name="corporationName"
                        value={corporationName}
                        onChange={handleOnCorporationName}
                      />
                    )}
                    {isCorporation === false && (
                      <input
                        placeholder="not corporation"
                        type="text"
                        className="col-10 fs-5 p-3 mb-2"
                        name="corporationName"
                        value={notCorporationName}
                        onChange={handleOnNotCorporationName}
                      />
                    )}

                    <div className="col-10 fs-5 px-3 mt-1">
                      <div>Are you An Agency?</div>
                      <span className="px-2">
                        <input
                          onChange={handleChangeOnIsAgency}
                          type="radio"
                          value="yes"
                          id="yesagency"
                          name="agency"
                        />
                        <label htmlFor="yesagency" className="px-1">
                          Yes
                        </label>
                      </span>
                      <span className="px-2">
                        <input
                          onChange={handleChangeOnIsAgency}
                          type="radio"
                          value="no"
                          id="noagency"
                          name="agency"
                        />
                        <label htmlFor="noagency" className="px-1">
                          No
                        </label>
                      </span>
                    </div>

                    

                    <div className="col-10 py-1 my-3">
                        <TermsAndConditions />
                        <br />
                      <label for="accepttermssignature" className="form-label">
                      Send Your signature if you agree to our terms and conditions.
                      </label>
                      <input
                        className="form-control form-control-lg"
                        style={{fontSize: "15px"}}
                        id="accepttermssignature"
                        name="accepttermssignature"
                        type="file"
                      />
                    </div>

                    <div className="col-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-color px-5 fs-3"
                        disabled={disabled}
                      >
                        {disabled ? <Spinner animation="border" /> : "Register"}
                      </button>
                      <p className="fs-5 mt-3">
                        Already have an account? <br />
                        <Link className="" to="/login">
                          Log In{" "}
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
