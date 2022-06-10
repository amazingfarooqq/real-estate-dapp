import React, { useState } from "react";
import { useAuth } from "../../AuthContext";

export const PropertyFees = () => {
  const {
    realEstateContract,
    addpropertyfee,
    putOnSellPropertyFee,
    individualSellingChargesInPercentage,
    agencySellingChargesInPercentage,
    contractOwner,
    account,
  } = useAuth();

  const [addingpropertyFeeInput, setAddingpropertyFeeInput] = useState();
  const [sellingPropertyFeeInput, setSellingPropertyFeeInput] = useState();
  const [
    individualPercentageInput,
    setIndividualPercentageInput,
  ] = useState();
  const [
    agencyPercentageInput,
    setAgencyPercentageInput,
  ] = useState();

  const addingPropertyFeeFunction = async () => {
    console.log(addingpropertyFeeInput);
    await realEstateContract.changeAddPropertyFee(
      `${addingpropertyFeeInput}000000000000000000`
    );
  };
  const sellingPropertyFeeFunction = async () => {
    await realEstateContract.changeOnSellPropertyFee(
      `${sellingPropertyFeeInput}000000000000000000`
    );
  };
  const changeIndividualSellingCharges = async () => {
    await realEstateContract.changeIndividualSellingCharges(
      individualPercentageInput,

    );
  };
  const changeAgencySellingCharges = async () => {
    await realEstateContract.changeAgencySellingCharges(
      agencyPercentageInput
    );
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-9 col-md-5 bg-dark text-light p-5 rounded m-1 text-center"
          style={{ background: "white" }}
        >
          <h4 className="py-2">
            Property Adding Fee <span>(${parseInt(addpropertyfee)})</span>
          </h4>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              className="form-control"
              type="number"
              aria-label="Amount (to the nearest dollar)"
              value={addingpropertyFeeInput}
              onChange={(e) => setAddingpropertyFeeInput(e.target.value)}
            />
            <div className="input-group-append">
            {contractOwner === account ? (
                <button
                  className="btn btn-color"
                  onClick={addingPropertyFeeFunction}
                >
                  Change
                </button>
              ) : (
                <button className="btn btn-color disabled">Only Owner</button>
              )}
            </div>
          </div>
        </div>
        <div
          className="col-9 col-md-5 bg-dark text-light p-5 rounded m-1 text-center"
          style={{ background: "white" }}
        >
          <h4 className="py-2">
            Property Selling Fee <span>(${parseInt(putOnSellPropertyFee)})</span>
          </h4>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              className="form-control"
              type="number"
              aria-label="Amount (to the nearest dollar)"
              value={sellingPropertyFeeInput}
              onChange={(e) => setSellingPropertyFeeInput(e.target.value)}
            />
            <div className="input-group-append">
              {contractOwner === account ? (
                <button
                  className="btn btn-color"
                  onClick={sellingPropertyFeeFunction}
                >
                  Change
                </button>
              ) : (
                <button className="btn btn-color disabled">Only Owner</button>
              )}
            </div>
          </div>
        </div>
        <div
          className="col-9 col-md-5 bg-dark text-light p-5 rounded m-1 text-center"
          style={{ background: "white" }}
        >
          <h4 className="py-2">
            %age sold properties Fee For Individuals{" "}
            <span>({parseInt(individualSellingChargesInPercentage)}%)</span>
          </h4>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              className="form-control"
              type="number"
              aria-label="Amount (to the nearest dollar)"
              value={individualPercentageInput}
              onChange={(e) =>
                setIndividualPercentageInput(e.target.value)
              }
            />
            <div className="input-group-append">
            {contractOwner === account ? (
                <button
                  className="btn btn-color"
                  onClick={changeIndividualSellingCharges}
                >
                  Change
                </button>
              ) : (
                <button className="btn btn-color disabled">Only Owner</button>
              )}
            </div>
          </div>
        </div>
        <div
          className="col-9 col-md-5 bg-dark text-light p-5 rounded m-1 text-center"
          style={{ background: "white" }}
        >
          <h4 className="py-2">
            %age sold properties Fee For Agency{" "}
            <span>({parseInt(agencySellingChargesInPercentage)}%)</span>
          </h4>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              className="form-control"
              type="number"
              aria-label="Amount (to the nearest dollar)"
              value={agencyPercentageInput}
              onChange={(e) =>
                setAgencyPercentageInput(e.target.value)
              }
            />
            <div className="input-group-append">
            {contractOwner === account ? (
                <button
                  className="btn btn-color"
                  onClick={changeAgencySellingCharges}
                >
                  Change
                </button>
              ) : (
                <button className="btn btn-color disabled">Only Owner</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
