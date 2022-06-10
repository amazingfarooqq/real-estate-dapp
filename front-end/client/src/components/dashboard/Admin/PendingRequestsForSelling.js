import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
import { PendingPropertyCard } from "../../PropertyCard/PendingPropertyCard";
import { PropertyCard } from "../../PropertyCard/PropertyCard";
import { ModalForSellRequestedProperties } from "./ModalForSellRequestedProperties.js";

export const PendingRequestsForSelling = () => {
  const { users, setUsers, realEstateContract, requestsSellPropertyObject } =
    useAuth();

  return (
    <div className="row" style={{ background: "white" }}>
      <div className="col-12 py-3">
        <div className="row">
          <div className="col-12 px-4">
            <h3>Requests To Sell Property</h3>
          </div>

          <div className="col-12 px-4">
            <div className="row">
              {requestsSellPropertyObject == 0 ? (
                <PendingPropertyCard classNameTop="col-12 col-md-6 p-3" />
              ) : (
                requestsSellPropertyObject.map((data, i) =>
                  data.details == "" ? (
                    ""
                  ) : (
                    <PropertyCard
                      componentAsProp={
                        <ModalForSellRequestedProperties data={data} />
                      }
                      classNameTop="col-12 col-md-6 p-3"
                      data={data}
                    />
                  )

                  // <div className="col-12 col-md-6 p-3">
                  //   <div className="row">
                  //     <img
                  //       className="col-12 w-100 rounded"
                  //       style={{ height: "250px" }}
                  //       src={data.Pictures}
                  //       alt="img"
                  //     />

                  //     <div className="row m-0 p-0">
                  //       <div className="col-6 text-start">title of property {parseInt(data.id._hex, 16)}</div>
                  //       <div className="col-6 text-end">{parseInt(data.id._hex, 16)}</div>
                  //     </div>

                  //     <div className="col-12">{`${data.CurrentOwner.slice(0,5)}...${data.CurrentOwner.slice(-5)}`}</div>
                  //     <div className="col-12">
                  //     <ModalForSellRequestedProperties data={data}/>
                  //     </div>
                  //   </div>
                  // </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
