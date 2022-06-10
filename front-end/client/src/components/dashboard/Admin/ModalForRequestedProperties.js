import { formatEther } from "ethers/lib/utils";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../../AuthContext";

export const ModalForRequestedProperties = ({ data }) => {
  const { contractOwner, active, account, realEstateContract } = useAuth();

  const [rejection, setRejection] = useState(false)
  const [rejectionMessage, setRejectionMessage] = useState('')

  // console.log(data);

  // console.log("contractOwner:", contractOwner);
  // console.log("account:", account);
  // if (contractOwner === account) {
  //   console.log("same");
  // } else {
  //   console.log("not same");
  // }

  let propertyId = parseInt(data.id._hex, 16);

  const ApproveRequestToAddProperty = async () => {
    console.log(propertyId);
    await realEstateContract.ApproveRequestToAddProperty(propertyId, true , "");
  };
  const RejectRequestToAddProperty = async () => {
    await realEstateContract.ApproveRequestToAddProperty(propertyId, false , rejectionMessage);
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
      <Button
        onClick={() => setShow(true)}
        className="btn btn-primary py-1 mx-2 px-3"
      >
        Details
      </Button>
      <Modal
        fullscreen={fullscreen}
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Property Details
          </Modal.Title>
        </Modal.Header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-12 p-3">
                  <div className="row">
                    <img
                      className="col-12 p-0 m-0 w-100 rounded"
                      style={{ height: "250px" }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsKhpV5QABsXOw_xDictRdZCBQxiTggrZS_A&usqp=CAU"
                      alt="img"
                    />

                    <div className="row m-0 p-0">
                      <div className="col-11">
                        ${formatEther(data.price._hex)}
                      </div>
                      <div className="col-1">{parseInt(data.id._hex, 16)}</div>
                      <div className="col-12">{data.houseAddress}</div>
                    </div>

                    <div className="col-12">{`${data.CurrentOwner.slice(
                      0,
                      5
                    )}...${data.CurrentOwner.slice(-5)}`}</div>
                  </div>
                  <div className="col-12">
                    {active ? (
                      contractOwner !== account ? (
                        <>
                          <button
                            className="btn btn-success disabled"
                          >
                            Approve
                          </button>
                         
                          <button
                            className="btn btn-danger disabled mx-1"
                          >
                            Rejected
                          </button>
                          <p className="p-0 m-0 text-danger">*Only Owner of Smart Contract can approve/reject</p>

                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-success"
                            onClick={ApproveRequestToAddProperty}
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
                            onClick={RejectRequestToAddProperty}
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
            </div>
          </div>
        </div>{" "}
      </Modal>
    </>
  );
};
