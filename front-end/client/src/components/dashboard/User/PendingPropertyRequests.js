import { formatEther } from "ethers/lib/utils";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { PendingPropertyCard } from "../../PropertyCard/PendingPropertyCard";
import { PropertyCard } from "../../PropertyCard/PropertyCard";

export const PendingPropertyRequests = ({ owners }) => {
  const { active, account , requestsObject , fetchDataFunction } = useAuth();

  // console.log(account);

  // useEffect(() => {
  //   fetchDataFunction();
  // }, [requestsObject]);

  return (
    <>
      <div className="row">
    {active ? (
      <>
        {requestsObject && requestsObject == 0 ? (
          <PendingPropertyCard classNameTop="col-12 col-md-6 p-3" />
        ) : (
          <>
            {requestsObject && requestsObject.map((data, i) => {
              return (
                <>
                  {data.CurrentOwner === account && (
                    <PropertyCard  classNameTop="col-12 col-md-6 p-3" data={data}
                    componentAsProp={<Link className="btn btn-color py-1 mx-1" to={{pathname: `/properyDetails`}} state={{ data,}}>More Details</Link>}/>
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
