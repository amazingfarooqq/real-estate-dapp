import { formatEther } from "ethers/lib/utils";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { PendingPropertyCard } from "../../PropertyCard/PendingPropertyCard";
import { PropertyCard } from "../../PropertyCard/PropertyCard";

export const ApprovedSellProperties = ({ owners }) => {
  const { active, account , onSellpropertiesObject , fetchDataFunction } = useAuth();

  // console.log(account);
  // useEffect(() => {
  //   fetchDataFunction();
  // }, [onSellpropertiesObject]);

  return (
    <>
      <div className="row">
    {active ? (
      <>
        {onSellpropertiesObject && onSellpropertiesObject == 0 ? (
             <PendingPropertyCard classNameTop="col-12 col-md-6 p-3" />
        ) : (
          <>
            {onSellpropertiesObject && onSellpropertiesObject.map((data, i) => {
              return (
                <>
                  {data.CurrentOwner === account && (
                    <PropertyCard  classNameTop="col-12 col-md-6 p-3" data={data}
                    componentAsProp={<button className="disabled btn btn-success mx-1">On Sell</button>}/>  
                  //   <div className="col-12 col-md-6 p-3">
                  //   <div className="card shadow-0 border rounded-3">
                  //     <div className="card-body">
                  //       <div className="row">
                  //         <div className="col-lg-6">
                  //           <div className="bg-image hover-zoom ripple rounded ripple-surface">
                  //             <img style={{height: '250px'}} src={data.Pictures}
                  //               className="w-100" />
                  //             <a href="#!">
                  //               <div className="hover-overlay">
                  //                 <div className="mask" style={{backgroundColor: 'rgba(253, 253, 253, 0.15)'}}></div>
                  //               </div>
                  //             </a>
                  //           </div>
                  //         </div>
                  //         <div className="col-lg-6 border-sm-start-none border-start">
                  //           <div className="row">
                  //             <h4 className="col-12">
                  //               <span className="btn btn-success">${formatEther(data.price._hex)}</span>
                  //               <button className="disabled btn btn-success mx-1">On Sell</button>

                  //             </h4>
                  //             {/* <div className="col-6">
                  //             </div> */}
                  //           </div>

                  //           <div className="row">
                  //           <div className="mt-1 mb-0 text-muted small">
                  //           {data.houseAddress}
                  //           </div>
                          
                  //           <p className="mb-4 mb-lg-0">
                  //           {`${data.CurrentOwner.slice(0,5)}...${data.CurrentOwner.slice(-5)}`}
                  //           </p>
                  //           <p className="col-12 mb-4 mb-lg-0">{data.details.slice(0,200)}</p>
                  //           </div>
                  //         </div>
                  //         <div className="col-lg-12">
                  //           <h5>Quant trident shirts {parseInt(data.id._hex, 16)}</h5>  
                            
                  //         </div>
                      
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div>
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
