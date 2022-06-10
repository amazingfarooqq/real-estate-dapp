import { formatEther } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { PendingPropertyCard } from "../../PropertyCard/PendingPropertyCard";
import { PropertyCard } from "../../PropertyCard/PropertyCard";
import { ModalPutOnSell } from "./ModalPutOnSell";

export const ApprovedProperties = ({ owners }) => {
  const {
    active,
    account,
    propertiesObject,
    onSellpropertiesObject,
    fetchDataFunction,
    realEstateContract,
  } = useAuth();

  return (
    <>
      <div className="row">
        {active ? (
          <>
            {propertiesObject && propertiesObject == 0 ? (
              <PendingPropertyCard classNameTop="col-12 col-md-6 p-3" />
            ) : (
              <>
                {propertiesObject &&
                  propertiesObject.map((data, i) => {
                    return (
                      <>
                        {data.CurrentOwner === account && (
                          <PropertyCard  classNameTop="col-12 col-md-6 p-3" data={data}
                          componentAsProp={<ModalPutOnSell data={data}/>}/>        
                        )}
                      </>
                    );
                  })}
              </>
            )}
          </>
        ) : (
          "PLease Connect to your Wallet"
        )}
      </div>
    </>
  );
};
