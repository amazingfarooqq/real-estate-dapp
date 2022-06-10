import { parseEther } from "ethers/lib/utils";
import React, { useState } from "react";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import { useAuth } from "../../AuthContext";

function toWei(n) {
  return parseEther(n);
}

export const ModalPutOnSell = ({ data }) => {
  const { putOnSellPropertyFee, realEstateContract , tetherTokenContract, account , RealEstateContractAddress } = useAuth();
  
  const [smShow, setSmShow] = useState(false);

  const [newPrice, setNewPrice] = useState("");
  const [error, setError] = useState("");

  const addOnSellFunction = async (_id) => {
    if (!newPrice) {
      setError("New Price is missing");
    } else {
      console.log(_id);
      setError("");

      const value = await tetherTokenContract.allowance(
        account,
        RealEstateContractAddress
      );
      console.log(value);
      const val = value.gt(0);
      console.log(val);

      if (val) {
        await realEstateContract.requestToSellProperty(_id, toWei(newPrice));
      } else {
        let sellingfee = `${parseInt(putOnSellPropertyFee)}000000000000000000`
        console.log("this is approve : ", tetherTokenContract);
        const tx = await tetherTokenContract.approve(
          RealEstateContractAddress,
          sellingfee
        );
        const receipt = await tx.wait();
        console.log(receipt.status);

        await realEstateContract.requestToSellProperty(_id, toWei(newPrice));
      }

    }
  };

  return (
    <>
      <Button onClick={() => setSmShow(true)} className="btn btn-primary mx-2">
        Details
      </Button>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        {/* <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Small Modal
          </Modal.Title>
        </Modal.Header> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 py-3">
              <div className="row">
                <img
                  className="col-12 p-0 m-0 w-100 rounded"
                  style={{ height: "250px" }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsKhpV5QABsXOw_xDictRdZCBQxiTggrZS_A&usqp=CAU"
                  alt="img"
                />

                {error && (
                  <Alert key={"danger"} variant={"danger"}>
                    {" "}
                    {error}{" "}
                  </Alert>
                )}

                <div className="row m-0 p-0">
                  <div className="col-1">{parseInt(data.id._hex, 16)}</div>
                  <div className="col-12">{data.houseAddress}</div>
                </div>

                <div className="col-12">{`${data.CurrentOwner.slice(
                  0,
                  5
                )}...${data.CurrentOwner.slice(-5)}`}</div>
              </div>
              <div className="row">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    className="form-control"
                    type="text"
                    aria-label="Amount (to the nearest dollar)"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        addOnSellFunction(parseInt(data.id._hex, 16))
                      }
                    >
                      Put On Sell
                    </button>
                  </div>
                </div>

                <div className="row py-2">
                  <div className="col-12 text-danger">
                    <h5 className="p-0 m-0 fw-bold">Note:</h5>
                    <div className="p-0 m-0">
                      *Fee for selling this property is $
                      {parseInt(putOnSellPropertyFee) || (
                        <Spinner animation="border" size="sm" />
                      )}
                    </div>
                  </div>
                </div>
                {/* <input
                  className="col-12 py-3"
                  placeholder="On sell price"
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
                <button
                  className="col-12 btn btn-primary"
                  onClick={() => addOnSellFunction(parseInt(data.id._hex, 16))}
                >
                  Put On Sell
                </button> */}
              </div>
            </div>
          </div>
        </div>{" "}
      </Modal>
    </>
  );
};
