import { formatEther } from "ethers/lib/utils";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
import { storage } from "../../firebase/config";
import { PendingPropertyCard } from "../../PropertyCard/PendingPropertyCard";
import { PropertyCard } from "../../PropertyCard/PropertyCard";
import { ModalForRequestedProperties } from "./ModalForRequestedProperties";

export const AddRequestedProperties = () => {
  const { realEstateContract, requestsObject } = useAuth();

  const [imagestest, setImagestest] = useState([]);

  // console.log('imagestest:', imagestest)
  // const [requestsObject, setRequestPropertyObject] = useState([]);

  // useEffect(() => {
  //   pendingIdFunction();
  // }, [requestsObject]);


  // useEffect(() => {
  //   const propertyImageRef = ref(storage, `properties/2/`);
  //   listAll(propertyImageRef).then((response) => {
  //       console.log('response: ',response)

  //     response.items.forEach((item) => {
  //       console.log('item: ',item)

  //       getDownloadURL(item).then((url) => {
  //         console.log('url: ',url)
  //         setImagestest((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);


  // console.log(requestsObject);

  //  async function pendingIdFunction() {
  //   //  console.log(await realEstateContract.requests(2));
  //     const run =
  //       realEstateContract && (await realEstateContract.AddedPropertyID());
  //       let num = parseInt(run, 16);
  //       let generateArray = await Array.from({ length: num }, (_, i) => i + 1);
  //       let da = [];

  //     await Promise.all(
  //       generateArray.map(async (number) => {
  //         const data = await realEstateContract.requests(number);
  //         da.push(data);
  //       })
  //     );
  //     setRequestPropertyObject(da);
  //   }

  return (
    <div className="row justify-content-center" style={{ background: "white" }}>
      <div className="col-12 py-3">
        <div className="row">
          <div className="col-12 px-4">
            <h3>Requests To Add Property</h3>
          </div>

          <div className="col-12 px-4">
            <div className="row ">
              {requestsObject == 0 ? (
                <PendingPropertyCard classNameTop="col-12 col-md-6 p-3"/>
              ) : (
                requestsObject.map((data, i) => (
                  <>
                  
                    {data.details == "" ? (
                      ""
                    ) : (
                      <PropertyCard componentAsProp={<ModalForRequestedProperties data={data} />} classNameTop="col-12 col-md-6 p-3" data={data}/>
                    )}
                  </>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
