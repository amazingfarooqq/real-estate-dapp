import axios from "axios";
import { BigNumber } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
// import './admin.css'

function toWei(n) {
  return parseEther(n);
}
export const ModalForUpdatingProperty = ({ data }) => {
  // console.log(data);

  const {
    baseUrl,
    active,
    account,
    realEstateContract,
    tetherTokenContract,
    RealEstateContractAddress,
    addpropertyfee,
    contractOwner,
  } = useAuth();

  // console.log(active, account);
  const [message, setMessage] = useState();

  let propertyId = parseInt(data.id._hex, 16);

  // All state values expcept some , they are written seperately
  const [inputValues, setInputValues] = useState({
    title: data.title,
    ownerAddress: data.CurrentOwner,
    priceOfPerperty: formatEther(data.price._hex),
    phoneNumber: data.phoneNumber,
    picturee: "",
    houseAddress: data.houseAddress,
    details: data.details,
  });

  const updateProperty = async () => {
    if (!inputValues.ownerAddress) {
      setMessage("Address is missing");
    } else if (!inputValues.title) {
      setMessage("Title is missing");
    } else if (!inputValues.priceOfPerperty) {
      setMessage("price of property is missing");
    } else if (!inputValues.phoneNumber) {
      setMessage("Your phone number is missing");
    } else if (!inputValues.details) {
      setMessage("Details Of property is missing");
    } else {
      setMessage("");

      
      if (inputValues.picturee) {
        let formData = new FormData();
  
        var propertyMainImage = document.getElementById("propertyMainImage");
  
        formData.append("propertyMainImage", propertyMainImage.files[0]);
        console.log();
        axios({
          method: "post",
          url: `${baseUrl}/uploadfiles`,
          data: formData,
        }).then(async (response) => {
          if (response.data.status == 200) {
            console.log(response.data.imageone);
            const value = await tetherTokenContract.allowance(
              inputValues.ownerAddress,
              RealEstateContractAddress
            );
            console.log(value);
            const val = value.gt(0);
            console.log(val);
            if (val) {
              await realEstateContract.updateAddingProperty(
                data.id,
                inputValues.title,
                toWei(inputValues.priceOfPerperty),
                inputValues.phoneNumber,
                inputValues.ownerAddress,
                inputValues.details,
                inputValues.houseAddress,
                response.data.imageone
              );
            } else {
              let addingfee = `${parseInt(addpropertyfee)}000000000000000000`;

              console.log("id:", propertyId);
              console.log("this is approve : ", addpropertyfee);
              const tx = await tetherTokenContract.approve(
                RealEstateContractAddress,
                addingfee
              );
              const receipt = await tx.wait();
              console.log(receipt.status);
              await realEstateContract.updateAddingProperty(
                propertyId,
                inputValues.title,
                toWei(inputValues.priceOfPerperty),
                inputValues.phoneNumber,
                inputValues.ownerAddress,
                inputValues.details,
                inputValues.houseAddress,
                response.data.imageone
              );
            }
          }
        });
      } else {
        const value = await tetherTokenContract.allowance(
          inputValues.ownerAddress,
          RealEstateContractAddress
        );
        console.log(value);
        const val = value.gt(0);
        console.log(val);
        if (val) {
          await realEstateContract.updateAddingProperty(
            data.id,
            inputValues.title,
            toWei(inputValues.priceOfPerperty),
            inputValues.phoneNumber,
            inputValues.ownerAddress,
            inputValues.details,
            inputValues.houseAddress,
            data.Pictures
          );
        } else {
          let addingfee = `${parseInt(addpropertyfee)}000000000000000000`;

          console.log("id:", propertyId);
          console.log("this is approve : ", addpropertyfee);
          const tx = await tetherTokenContract.approve(
            RealEstateContractAddress,
            addingfee
          );
          const receipt = await tx.wait();
          console.log(receipt.status);
          await realEstateContract.updateAddingProperty(
            propertyId,
            inputValues.title,
            toWei(inputValues.priceOfPerperty),
            inputValues.phoneNumber,
            inputValues.ownerAddress,
            inputValues.details,
            inputValues.houseAddress,
            data.Pictures
          );
        }
      }
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  // const ApproveRequestToSellProperty = async () => {
  //   console.log(propertyId);
  //   await realEstateContract.ApproveRequestToSellProperty(propertyId, true);
  // };
  // const RejectRequestToSellProperty = async () => {
  //   await realEstateContract.ApproveRequestToSellProperty(propertyId, false);
  // };

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    console.log(propertyId);
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>
      <Button className="btn btn-primary mx-1" onClick={() => handleShow(true)}>
        Details
      </Button>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row mt-2 justify-content-center">
              <div
                className="col-10 px-4 pb-4 rounded"
                style={{ background: "white" }}
              >
                <div className="row py-2">
                  <div className="col-12 text-danger">
                    <h5 className="p-0 m-0 fw-bold">Note:</h5>
                    <div className="p-0 m-0">
                      *Fee for updating this property is $
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
                      <label htmlFor="ownerAddress">Title</label>
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
                        value={inputValues.ownerAddress}
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
                      <label htmlFor="priceOfPerperty">Price Of Property</label>
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
                      <label htmlFor="houseAddress">House Address</label>
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
                      <label htmlFor="picturee">picturee</label>
                      <input
                        type="file"
                        name="picturee"
                        multiple
                        value={inputValues.picturee}
                        onChange={handleOnChange}
                        className="form-control"
                        id="propertyMainImage"
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
                    onClick={updateProperty}
                    type="submit"
                    className="btn btn-primary mt-1"
                  >
                    Update
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
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
