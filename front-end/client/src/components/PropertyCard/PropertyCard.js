import { formatEther } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
import { ModalForRequestedProperties } from "../dashboard/Admin/ModalForRequestedProperties";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../firebase/config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const PropertyCard = ({ data , classNameTop  , componentAsProp}) => {
  const [imagesList, setImagesList] = useState([]);

  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    autoplay: true,
    className: "col-12 d-none d-lg-block",
    arrows: true
  };

  useEffect(() => {
    const propertyImageRef = ref(storage, `properties/${parseInt(data.id, 16)}/`);
    listAll(propertyImageRef).then((response) => {
      // console.log('response: ',response)
      console.log(response.items.length)

      response.items.forEach((item) => {
        // console.log('item: ',item)

        getDownloadURL(item).then((url) => {
        //   console.log(parseInt(_id, 16), url);
          setImagesList((prev) => [...prev, url]);
        });
      });

    });
  },[])
//   const testing = (_id) => {
    
//   };
  return (
    <div className={classNameTop}>
      {/* {testing(data.id)} */}
      <div className="card shadow-0 border rounded-3">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6">
              <div className="bg-image hover-zoom ripple rounded ripple-surface">
              <Slider {...settings}>
              {/* <img height={250} className="w-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0EzLwJdi6W-G1b1SLY94ILpwVyjmf5qL8LA&usqp=CAU" />
              <img height={250} className="w-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIDejb17L_GlND0pWsmFeiro-Xbb9-1VplMQ&usqp=CAU" /> */}
              {imagesList.map((item, index) => {
                  return <img style={{ height: "250px" }} className="w-100" key={index} src={item} />;
                })}
              </Slider>
                
                {/* <img
                                    style={{ height: "250px" }}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0EzLwJdi6W-G1b1SLY94ILpwVyjmf5qL8LA&usqp=CAU"
                                    className="w-100"
                                  /> */}
                <a href="#!">
                  <div className="hover-overlay">
                    <div
                      className="mask"
                      style={{
                        backgroundColor: "rgba(253, 253, 253, 0.15)",
                      }}
                    ></div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-lg-6 border-sm-start-none border-start">
              <div className="row">
                <h4 className="col-12">
                  <span className="btn btn-success">
                    ${formatEther(data.price._hex)}
                  </span>
                  {componentAsProp}
                </h4>
              </div>

              <div className="row">
                <div className="mt-1 mb-0 text-muted small">
                  {data.houseAddress}
                </div>

                <p className="mb-4 mb-lg-0">
                  {`${data.CurrentOwner.slice(
                    0,
                    5
                  )}...${data.CurrentOwner.slice(-5)}`}
                </p>
                <p className="col-12 mb-4 mb-lg-0">
                  {data.details.slice(0, 200)}
                </p>
                <p className="col-12 mb-4 mb-lg-0">{data.Pictures}</p>
              </div>
            </div>
            <div className="col-lg-12">
              <h5>{data.title}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
