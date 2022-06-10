import { useEffect } from "react";
import { useAuth } from "../AuthContext";
import { Header } from "../header/Header";
import { ModalBuy } from "./ModalBuy";
import { formatEther } from "ethers/lib/utils";
import { PendingPropertyCard } from "../PropertyCard/PendingPropertyCard";
import { PropertyCard } from "../PropertyCard/PropertyCard";
import { PropertyDetails } from "../PropertyDetails/PropertyDefails";

export const Buy = () => {
  const {
    realEstateContract,
    active,
    tetherTokenContract,
    onSellpropertiesObject,
    propertiesObject,
    fetchDataFunction,
  } = useAuth();

  // useEffect(() => {
  //   fetchDataFunction();
  // }, [propertiesObject, onSellpropertiesObject]);

  // console.log(onSellpropertiesObject);



  return (
    <div>
      <Header />

        
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-12 col-lg-6">

            <div className="row">
            <h2 className="fw-bold" style={{ fontSize: "40px" }}>
              Properties
            </h2>
              <div className="col fs-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Veritatis, recusandae!
              </div>

              <div className="col-12 mt-2">
              <div className="row justify-content-center mb-3">
                  {propertiesObject == 0 ? (
                    <PendingPropertyCard classNameTop="col-md-12"/>
                  ) : (         
                    <>    
                      {propertiesObject.map((data , index) => data.details == '' ? '' :
                       <PropertyCard componentAsProp={<PropertyDetails componentAsProp={<button className="btn btn-primary disabled mx-lg-1">Not On Sell</button> } data={data}/>
                       } classNameTop="col-md-12" data={data}/> 
                      )}
                    </>  
                                      
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 ">
            <h2 className="fw-bold" style={{ fontSize: "40px" }}>
              On Sell Properties
            </h2>

            <div className="row">
              <div className="col fs-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Veritatis, recusandae!
              </div>

              <div className="col-12 mt-2">
                <div className="row justify-content-center mb-3">
                  {onSellpropertiesObject == 0 ? (
                       <PendingPropertyCard classNameTop="col-md-12"/>
                  ) : (
                      <>

                            {onSellpropertiesObject.map((data , index) => data.details == '' ? '' : 
                               <PropertyCard componentAsProp={ <ModalBuy data={data} />} classNameTop="col-12" data={data}/>
                            // <div className="col-md-12" key={index+Math.random()}>
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
                            //               <ModalBuy
                            //                   data={data}
                                           
                            //                 />
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
                            //           <h5>{data.title}</h5>  
                                      
                            //         </div>
                                
                            //       </div>
                            //     </div>
                            //   </div>
                            // </div>
                          )}
                      </>     
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
