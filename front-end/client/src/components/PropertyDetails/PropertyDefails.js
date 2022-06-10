import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Carousel } from 'react-bootstrap'
import { formatEther } from "ethers/lib/utils";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../firebase/config";

export const PropertyDetails = ({data , componentAsProp}) => {

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [imagesList, setImagesList] = useState([]);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

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

  return (
    <>
      <Button
        onClick={() => setShow(true)}
        className="btn btn-primary py-1 mx-2 px-3"
      >
        Details
      </Button>
      <Modal
        fullscreen={fullscreen}
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Property Details
          </Modal.Title>
        </Modal.Header>
        <div className="container-fluid bg-light">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <div className="row">
                        
                        <Carousel fade>
                            {imagesList.map(url => {
                                return  <Carousel.Item>
                                <img className="d-block w-100 " style={{height: '500px'}}
                                src={url}
                                alt="First slide"
                                />
                            </Carousel.Item>
                            })}
                        </Carousel> 
                        <div className='col-12 mt-2'>
                            <h2>details</h2>
                            <p>Owner of this property : {data.CurrentOwner}</p>
                            <p>{data.houseAddress}</p>
                            <span className="btn btn-success">
                                ${formatEther(data.price._hex)}
                            </span>
                            {componentAsProp}
                        </div>  

                        <div className="col-12">
                            <div className="row">
                                <div className="col">
                                    <button className='m-1 btn btn-light'>
                                        <div className='p-0 m-0'>Status</div>
                                        <div className='p-0 m-0 fw-bold fs-4'>Active</div>
                                    </button>
                                    <button className='m-1 btn btn-light'>
                                        <div className='p-0 m-0'>Bedrooms</div>
                                        <div className='p-0 m-0 fw-bold fs-4'>2</div>
                                    </button>
                                    <button className='m-1 btn btn-light'>
                                        <div className='p-0 m-0'>Total Baths</div>
                                        <div className='p-0 m-0 fw-bold fs-4'>2</div>
                                    </button>
                                    <button className='m-1 btn btn-light'>
                                        <div className='p-0 m-0'>Full Bath</div>
                                        <div className='p-0 m-0 fw-bold fs-4'>2</div>
                                    </button>
                                    <button className='m-1 btn btn-light'>
                                        <div className='p-0 m-0'>SqFt</div>
                                        <div className='p-0 m-0 fw-bold fs-4'>1,612</div>
                                    </button>
                                    <button className='m-1 btn btn-light'>
                                        <div className='p-0 m-0'>County</div>
                                        <div className='p-0 m-0 fw-bold fs-4'>Miami-Dade County</div>
                                    </button>
                                    <button className='m-1 btn btn-light'>
                                        <div className='p-0 m-0'>Subdivision</div>
                                        <div className='p-0 m-0 fw-bold fs-4'>CORAL GABLES RIVIERA SEC</div>
                                    </button>
                                    <button className='m-1 btn btn-light'>
                                        <div className='p-0 m-0'>Year Built</div>
                                        <div className='p-0 m-0 fw-bold fs-4'>1952</div>
                                    </button>
                                    <button className='m-1 btn btn-light'>
                                        <div className='p-0 m-0'>Property Type</div>
                                        <div className='p-0 m-0 fw-bold fs-4'>Residential</div>
                                    </button>
                                     <button className='m-1 btn btn-light'>
                                        <div className='p-0 m-0'>Property Sub Type</div>
                                        <div className='p-0 m-0 fw-bold fs-4'>Single Family Residence</div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 mt-3">
                            <h1>Description</h1>
                            <p className='fs-5'>This beautiful home sits on an amazing oversized 13,200 SF lot. It has a large back yard and its location is fabulous. You can add your own finishing touches or build your new dream home! From the moment you walk in, you will appreciate the bright and spacious open area with vaulted wood ceilings, hardwood floors and a fireplace. The property has an extra study/office with plenty of room for an addition. New roof installed a couple of years ago. Minutes from shops, restaurants, movie theaters and some of the best public and private schools in Miami (UM, Riviera School, Sunset Elementary). 1 car garage, bonus splash pool.</p>
                            <p className='fs-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet vitae nihil fugit recusandae quam perspiciatis iusto laudantium sed distinctio veritatis.</p>
                        </div>
                    </div>
              
                </div>
            </div>
        </div>
      </Modal>
    </>
  );
};
