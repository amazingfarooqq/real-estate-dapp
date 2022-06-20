// import { BigNumber } from "ethers";
import axios from "axios";
import { ethers } from "ethers";
import { parseEther, formatEther } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Header } from "../header/Header";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./../firebase/config";
import { v4 as uuidv4 } from "uuid";

function toWei(n) {
  return parseEther(n);
}

export const Sell = () => {
  const {
    baseUrl,
    active,
    userInfo,
    realEstateContract,
    tetherTokenContract,
    RealEstateContractAddress,
    addpropertyfee,
    account,
  } = useAuth();

  const [images, setImages] = useState(null);
  const [imagesList, setImagesList] = useState([]);
  const [message, setMessage] = useState();

  const [mainImage, setMainImage] = useState();

  // All state values expcept some , they are written seperately
  const [inputValues, setInputValues] = useState({
    title: "",
    priceOfPerperty: "",
    phoneNumber: "",
    pictures: "",
    houseAddress: "",
    details: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleOnImages = (e) => {
    if (e.target.files) {
      setImages([...e.target.files]);
      e.target.files = null;
    }
  };

  async function requestToAddProperty() {
    if (!inputValues.title) {
      setMessage("Title is missing");
    } else if (!inputValues.priceOfPerperty) {
      setMessage("price of property is missing");
    } else if (!inputValues.phoneNumber) {
      setMessage("Your phone number is missing");
    } else if (!images) {
      setMessage("picture Of property is missing");
    } else if (!inputValues.details) {
      setMessage("Details Of property is missing");
    } else {
      setMessage("");

      // const tokenID = await realEstateContract.AddedPropertyID();

      setImagesList([]);
      const idd = await realEstateContract.getCurrentId();
      
      await images.map((item) => {
        const imageRef = ref(
          storage,
          `properties/${idd}/${item.name + uuidv4()}`
        );
        uploadBytes(imageRef, item).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImagesList((prev) => [...prev, url]);
          });
        });
      });

      const formData = new FormData();
      formData.append("file", mainImage);

      const API_KEY = process.env.REACT_APP_API_KEY;
      const API_SECRET = process.env.REACT_APP_API_SECRET;

      console.log(API_KEY, API_SECRET);

      const URLforpinFILEtoIPFS = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

      const responseFromFiletoIPFS = await axios.post(
        URLforpinFILEtoIPFS,
        formData,
        {
          maxContentLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
            pinata_api_key: API_KEY,
            pinata_secret_api_key: API_SECRET,
          },
        }
      );

      console.log("responseFromFiletoIPFS: ", responseFromFiletoIPFS);

      const URLforpinJSONtoIPFS = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

      axios
        .post(
          URLforpinJSONtoIPFS,
          {
            name: "Santa Stella",
            description: "description",
            image: `ipfs://${responseFromFiletoIPFS.data.IpfsHash}/${idd}`,
            attributes: [
              {
                trait_type: "trait",
                value: 100,
              },
            ],
          },
          {
            headers: {
              pinata_api_key: API_KEY,
              pinata_secret_api_key: API_SECRET,
            },
          }
        )
        .then(async function (response) {
          console.log("responseFromFiletoIPFS: ", response.data.IpfsHash);

          let addingfee = `${parseInt(addpropertyfee)}000000000000000000`;

          const value = await tetherTokenContract.allowance(
            account,
            RealEstateContractAddress
          );

          const val = value.gt(0);
    
          if (val) {
            await realEstateContract.requestToAddProperty(
              inputValues.title,
              toWei(inputValues.priceOfPerperty),
              inputValues.phoneNumber,
              inputValues.details,
              inputValues.houseAddress,
              `properties/${idd}`,
              userInfo && userInfo.isAgency,
              `ipfs://${response.data.IpfsHash}/${idd}`
            );
          } else {
            console.log("this is tether : ", tetherTokenContract);
            const tx = await tetherTokenContract.approve(
              RealEstateContractAddress,
              addingfee
            );
            const receipt = await tx.wait();
            // console.log(receipt.status);
    
            await realEstateContract.requestToAddProperty(
              inputValues.title,
              toWei(inputValues.priceOfPerperty),
              inputValues.phoneNumber,
              inputValues.details,
              inputValues.houseAddress,
              `properties/${idd}`,
              userInfo && userInfo.isAgency,
              `ipfs://${response.data.IpfsHash}/${idd}`
            );
          }


          //handle response here
        })
        .catch(function (error) {
          //handle error here
          console.log(error);
        });


      // console.log(value);


    }
  }

  return (
    <div>
      <Header />
      <div className="container py-5">
        <div className="row  justify-content-center">
          <div className="col-md-12 text-center">
            <h1 className="fw-bold" style={{ fontSize: "60px" }}>
              Requsest To Add Property
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur reiciendis repudiandae voluptatibus quo nostrum ex
              provident ipsa sunt, culpa, possimus non? Voluptatem message
              blanditiis, obcaecati neque officia nobis nesciunt alias!
            </p>
            <hr />
          </div>

          {}

          {userInfo ? (
            <div className="col-md-9">
              {userInfo.approvement == "Rejected" && "you are rejected"}
              {userInfo.approvement == "Pending" && "your request is pending"}
              {userInfo.approvement == "Approved" && (
                <div className="row mt-2 justify-content-center">
                  <div
                    className="col-12 px-4 pb-4 rounded"
                    style={{ background: "white" }}
                  >
                    <div className="row py-2">
                      <div className="col-12 text-danger">
                        <h5 className="p-0 m-0 fw-bold">Note:</h5>
                        <div className="p-0 m-0">
                          *Fee for adding this property is $
                          {parseInt(addpropertyfee) || (
                            <Spinner animation="border" size="sm" />
                          )}
                        </div>
                      </div>
                    </div>
                    {message && (
                      <Alert
                        className="text-center"
                        key={"danger"}
                        variant="danger"
                      >
                        {message}
                      </Alert>
                    )}

                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="title">Title</label>
                          <input
                            type="text"
                            name="title"
                            value={inputValues.title}
                            onChange={handleOnChange}
                            className="form-control"
                            placeholder="Title of Property."
                            id="title"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="ownerAddress">Owner Address</label>
                          <input
                            type="text"
                            name="ownerAddress"
                            value={account}
                            onChange={handleOnChange}
                            className="form-control"
                            placeholder="Owner Wallet Address"
                            id="ownerAddress"
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="priceOfPerperty">
                            Price Of Property
                          </label>
                          <input
                            type="number"
                            name="priceOfPerperty"
                            value={inputValues.priceOfPerperty}
                            onChange={handleOnChange}
                            className="form-control"
                            placeholder="Amount"
                            id="last"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="addingProperyFee">Phone Number</label>
                          <input
                            type="number"
                            name="phoneNumber"
                            value={inputValues.phoneNumber}
                            onChange={handleOnChange}
                            className="form-control"
                            placeholder="Phone Number"
                            id="last"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="housEAddress">House Address</label>
                          <input
                            type="text"
                            name="houseAddress"
                            value={inputValues.houseAddress}
                            onChange={handleOnChange}
                            className="form-control"
                            placeholder="House Address.."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="pictures">
                            This image will go to pinata
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            onChange={(event) =>
                              setMainImage(event.target.files[0])
                            }
                          />
                          {/* <input
                            multiple 
                            // name="pictures"
                            type="file" 
                            onChange={handleOnImages}
                            // value={inputValues.pictures}
                            className="form-control"
                            // placeholder="picture"
                          /> */}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="pictures">pictures</label>
                          <input
                            multiple
                            // name="pictures"
                            type="file"
                            onChange={handleOnImages}
                            // value={inputValues.pictures}
                            className="form-control"
                            // placeholder="picture"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="details">Details </label> <br />
                          <textarea
                            className="w-100"
                            name="details"
                            value={inputValues.details}
                            onChange={handleOnChange}
                            id="details"
                            cols="30"
                            rows="10"
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    {!addpropertyfee ? (
                      <button
                        disabled={true}
                        type="submit"
                        className="btn btn-primary mt-1"
                      >
                        Just A Second
                      </button>
                    ) : active ? (
                      <button
                        onClick={requestToAddProperty}
                        type="submit"
                        className="btn btn-primary mt-1"
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        disabled={true}
                        type="submit"
                        className="btn btn-primary mt-1"
                      >
                        Please Connect to Your Wallet
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="col-12">
              <h1>Please login to sell your property</h1>
              <Link to="/login">
                {" "}
                <button className="btn btn-dark p-5 fs-4 py-3 m-1">
                  login
                </button>{" "}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
