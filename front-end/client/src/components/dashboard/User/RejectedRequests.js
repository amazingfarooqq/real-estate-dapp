import { formatEther } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { PendingPropertyCard } from "../../PropertyCard/PendingPropertyCard";
import { PropertyCard } from "../../PropertyCard/PropertyCard";
import { ModalForUpdatingProperty } from "./ModalForUpdatingProperty";
import { ModalForUpdatingSellProperty } from "./ModalForUpdatingSellProperty";

export const RejectedRequests = ({ owners }) => {
  const {
    active,
    account,
    rejectedRequestPropertiesObject,
    rejectedOnSellRequestPropertiesObject,
    realEstateContract,
  } = useAuth();

  //   const [isPropertyOnSell, setIsPropertyOnSell] = useState(false)

  // console.log(account);
  // useEffect(() => {
  //   fetchDataFunction();
  // }, [onSellpropertiesObject]);


  return (
    <>
      <div className="row">
        {active ? (
          <>
          <div className="col-12">
        <h2>Rejection Of Requested Properties</h2>
            {rejectedRequestPropertiesObject && rejectedRequestPropertiesObject == 0 ? (
              <PendingPropertyCard classNameTop="col-12 col-md-6 p-3"/>
            ) : (
              <>
                {rejectedRequestPropertiesObject &&
                  rejectedRequestPropertiesObject.map((data, i) => {
                    return (
                      <>
                        {data.CurrentOwner === account && (
                          <PropertyCard classNameTop="col-12 col-md-6 p-3" data={data}
                          componentAsProp={<ModalForUpdatingProperty  data={data}/>}/>
                        //    <div className="col-12 col-md-6 p-3">
                        //    <div className="card shadow-0 border rounded-3">
                        //      <div className="card-body">
                        //        <div className="row">
                        //          <div className="col-lg-6">
                        //            <div className="bg-image hover-zoom ripple rounded ripple-surface">
                        //              <img style={{height: '250px'}} src={data.Pictures}
                        //                className="w-100" />
                        //              <a href="#!">
                        //                <div className="hover-overlay">
                        //                  <div className="mask" style={{backgroundColor: 'rgba(253, 253, 253, 0.15)'}}></div>
                        //                </div>
                        //              </a>
                        //            </div>
                        //          </div>
                        //          <div className="col-lg-6 border-sm-start-none border-start">
                        //            <div className="row">
                        //              <h4 className="col-12">
                        //                <span className="btn btn-success">${formatEther(data.price._hex)}</span>
                        //                 <ModalForUpdatingProperty  data={data}/>
                        //              </h4>

                        //              {/* <div className="col-6">
                        //              </div> */}
                        //            </div>
      
                        //            <div className="row">
                        //            <div className="mt-1 mb-0 text-muted small">
                        //            {data.houseAddress}
                        //            </div>
                                 
                        //            <p className="mb-4 mb-lg-0">
                        //            {`${data.CurrentOwner.slice(0,5)}...${data.CurrentOwner.slice(-5)}`}
                        //            </p>
                        //            <p className="col-12 mb-4 mb-lg-0">{data.details.slice(0,200)}</p>
                        //            </div>

                        //            <div> <span className="fw-bold">Reason of Rejection:</span>  {data.reasonOfRejection}</div>
                        //          </div>
                        //          <div className="col-lg-12">
                        //            <h5>{data.title}</h5>  
                                   
                        //          </div>
                             
                        //        </div>
                        //      </div>
                        //    </div>
                        //  </div>
                        )}
                      </>
                    );
                  })}
              </>
            )}
          </div>
          <div className="col-12">
        <h2>Rejection Of Selling Properties</h2>
            {rejectedOnSellRequestPropertiesObject && rejectedOnSellRequestPropertiesObject == 0 ? (
              <PendingPropertyCard classNameTop="col-12 col-md-6 p-3"/>
            ) : (
              <>
                {rejectedOnSellRequestPropertiesObject &&
                  rejectedOnSellRequestPropertiesObject.map((data, i) => {
                    return (
                      <>
                        {data.CurrentOwner === account && (
                          <PropertyCard classNameTop="col-12 col-md-6 p-3" data={data}
                          componentAsProp={<ModalForUpdatingSellProperty  data={data}/>}/>
                        //    <div className="col-12 col-md-6 p-3">
                        //    <div className="card shadow-0 border rounded-3">
                        //      <div className="card-body">
                        //        <div className="row">
                        //          <div className="col-lg-6">
                        //            <div className="bg-image hover-zoom ripple rounded ripple-surface">
                        //              <img style={{height: '250px'}} src={data.Pictures}
                        //                className="w-100" />
                        //              <a href="#!">
                        //                <div className="hover-overlay">
                        //                  <div className="mask" style={{backgroundColor: 'rgba(253, 253, 253, 0.15)'}}></div>
                        //                </div>
                        //              </a>
                        //            </div>
                        //          </div>
                        //          <div className="col-lg-6 border-sm-start-none border-start">
                        //            <div className="row">
                        //              <h4 className="col-12">
                        //                <span className="btn btn-success">${formatEther(data.price._hex)}</span>
                        //                 <ModalForUpdatingSellProperty  data={data}/>
                        //              </h4>

                        //              {/* <div className="col-6">
                        //              </div> */}
                        //            </div>
      
                        //            <div className="row">
                        //            <div className="mt-1 mb-0 text-muted small">
                        //            {data.houseAddress}
                        //            </div>
                                 
                        //            <p className="mb-4 mb-lg-0">
                        //            {`${data.CurrentOwner.slice(0,5)}...${data.CurrentOwner.slice(-5)}`}
                        //            </p>
                        //            <p className="col-12 mb-4 mb-lg-0">{data.details.slice(0,200)}</p>
                        //            </div>

                        //            <div> <span className="fw-bold">Reason of Rejection:</span>  {data.reasonOfRejection}</div>
                        //          </div>
                        //          <div className="col-lg-12">
                        //            <h5>{data.title}</h5>  
                                   
                        //          </div>
                             
                        //        </div>
                        //      </div>
                        //    </div>
                        //  </div>
                        )}
                      </>
                    );
                  })}
              </>
            )}
          </div>
          </>
        ) : (
          "PLease Connect to your Wallet"
        )}
      </div>
    </>
  );
};
