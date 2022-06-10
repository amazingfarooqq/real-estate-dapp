import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const ModalPropertyDetails = ({ realEstateContract, data }) => {
  const [smShow, setSmShow] = useState(false);


  return (
    <>
      <Button
        onClick={() => setSmShow(true)}
        className="btn btn-primary py-1 mx-2 px-3"
      >
        Details
      </Button>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        className="p-0 m-0"
      >
        {/* <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Small Modal
          </Modal.Title>
        </Modal.Header> */}

          <div className="container-fluid">
            <div className="row">
              <div className="col-12 p-3">
                <div className="row">
                  <img
                    className="col-12 p-0 m-0 w-100 rounded"
                    style={{ height: "250px" }}
                    src={data.Pictures}
                    alt="img"
                  />

                  <div className="row m-0 p-0">
                    <div className="col-11">{data.Pictures}</div>
                    <div className="col-1">{parseInt(data.id._hex, 16)}</div>
                    <div className="col-12">{data.houseAddress}</div>
                  </div>

                  <div className="col-12">{`${data.CurrentOwner.slice(
                    0,
                    5
                  )}...${data.CurrentOwner.slice(-5)}`}</div>
                </div>
              </div>
            </div>
          </div>{" "}
      </Modal>
    </>
  );
};
