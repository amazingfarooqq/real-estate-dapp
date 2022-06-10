import axios from "axios";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
// import './admin.css'

export const ModalForSellRequestedProperties = ({ data }) => {
  const { contractOwner, active, account, realEstateContract } = useAuth();

  // console.log(data);

  const [rejection, setRejection] = useState(false)
  const [rejectionMessage, setRejectionMessage] = useState('')

  if (contractOwner === account) {
    console.log("same");
  } else {
    console.log("not same");
  }

  let propertyId = parseInt(data.id._hex, 16);

  const ApproveRequestToSellProperty = async () => {
    console.log(propertyId);
    await realEstateContract.ApproveRequestToSellProperty(propertyId, true , "");
  };
  const RejectRequestToSellProperty = async () => {
    await realEstateContract.ApproveRequestToSellProperty(propertyId, false , rejectionMessage);
  };

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    console.log(propertyId);
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>
      <Button className="btn btn-primary w-50" onClick={() => handleShow(true)}>
        Details
      </Button>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6 ">
                {/* <h2 className="fw-bold p-0 m-0" style={{textTransform: 'capitalize'}}>sdasd</h2> */}
                <div className="row">
                  <img
                    className="col-12 w-100 rounded"
                    style={{ height: "250px" }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsKhpV5QABsXOw_xDictRdZCBQxiTggrZS_A&usqp=CAU"
                    alt="img"
                  />
                  <div className="col-12 mt-3">
                    <h5 style={{ display: "inline" }}>Id</h5>:{" "}
                    {parseInt(data.id._hex, 16)}{" "}
                  </div>
                  <div className="col-12 ">
                    <h5 style={{ display: "inline" }}>Currect Owner</h5>:{" "}
                    {data.CurrentOwner}
                  </div>
                  <div className="col-12 ">
                    <h5 style={{ display: "inline" }}>price</h5>: {formatEther(data.price._hex)}
                  </div>
                  <div className="col-12 ">
                    {/* <h5 style={{ display: "inline" }}>Picture</h5>: {data.picture} */}
                  </div>
                  <div className="col-12 ">
                    <h5 style={{ display: "inline" }}>Details</h5>: {data.details}
                  </div>
                  <div className="col-12">
                    {active ? (
                      contractOwner !== account ? (
                        <span className="text-danger">
                          *Only Owner can approve/reject
                        </span>
                      ) : (
                        <>
                        <button
                          className="btn btn-success"
                          onClick={ApproveRequestToSellProperty}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger mx-1"
                          onClick={() => setRejection(!rejection)}
                        >
                          Reject
                        </button>

                        <br className="py-2 border border-dark"/>

                        {rejection &&
                        <>
                        <input onChange={(e) => setRejectionMessage(e.target.value)} placeholder="Rejection reason.." className="btn text-start" type="text" />
                        <button
                          className="btn btn-danger mx-1"
                          onClick={RejectRequestToSellProperty}
                        >
                          Send
                        </button>
                        </>                          
                        }

                      </>
                      )
                    ) : (
                      <span className="text-danger">
                        *Connect to your wallet to approve/reject this property
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-6">asdasd</div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
