import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { Footer } from '../footer/Footer'
import { Header } from '../header/Header'

export const DetailsOfPropery = () => {

    const {realEstateContract} = useAuth()
    const [requestPropertyObject, setRequestPropertyObject] = useState({})

    const aa = useLocation();

    useEffect(() => {
        setRequestPropertyObject(aa.state.data)
    }, [])

  return (
    <div>
        <Header />
        
        <div className="container-fluid">
            <div className="row">
                <div className="col-2 text-center d-none d-lg-block">
                    <h2>Similar Listings</h2>

                    <div className="row justify-content-center">
                        <button className="col-11 btn btn-secondary p-0 m-0 my-2 ">
                            <img className='w-100' src="https://images.pexels.com/photos/3288100/pexels-photo-3288100.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <h5 className='m-0 p-0 fw-bold'>Lorem, ipsum dolor.</h5>
                            <p className='m-0 p-0 px-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, modi?</p>
                        </button>
                        <button className="col-11 btn btn-secondary p-0 m-0 my-2 ">
                            <img className='w-100' src="https://images.pexels.com/photos/3288100/pexels-photo-3288100.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <h5 className='m-0 p-0 fw-bold'>Lorem, ipsum dolor.</h5>
                            <p className='m-0 p-0 px-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, modi?</p>
                        </button>
                        <button className="col-11 btn btn-secondary p-0 m-0 my-2 ">
                            <img className='w-100' src="https://images.pexels.com/photos/3288100/pexels-photo-3288100.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <h5 className='m-0 p-0 fw-bold'>Lorem, ipsum dolor.</h5>
                            <p className='m-0 p-0 px-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, modi?</p>
                        </button>
                        <button className="col-11 btn btn-secondary p-0 m-0 my-2 ">
                            <img className='w-100' src="https://images.pexels.com/photos/3288100/pexels-photo-3288100.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <h5 className='m-0 p-0 fw-bold'>Lorem, ipsum dolor.</h5>
                            <p className='m-0 p-0 px-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, modi?</p>
                        </button>
                        <button className="col-11 btn btn-secondary p-0 m-0 my-2 ">
                            <img className='w-100' src="https://images.pexels.com/photos/3288100/pexels-photo-3288100.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <h5 className='m-0 p-0 fw-bold'>Lorem, ipsum dolor.</h5>
                            <p className='m-0 p-0 px-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, modi?</p>
                        </button>
                        <button className="col-11 btn btn-secondary p-0 m-0 my-2 ">
                            <img className='w-100' src="https://images.pexels.com/photos/3288100/pexels-photo-3288100.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <h5 className='m-0 p-0 fw-bold'>Lorem, ipsum dolor.</h5>
                            <p className='m-0 p-0 px-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, modi?</p>
                        </button>
                        <button className="col-11 btn btn-secondary p-0 m-0 my-2 ">
                            <img className='w-100' src="https://images.pexels.com/photos/3288100/pexels-photo-3288100.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <h5 className='m-0 p-0 fw-bold'>Lorem, ipsum dolor.</h5>
                            <p className='m-0 p-0 px-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, modi?</p>
                        </button>
                        
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <Carousel fade>
                            <Carousel.Item>
                                <img className="d-block w-100 " style={{height: '500px'}}
                                src="https://images.pexels.com/photos/3288100/pexels-photo-3288100.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100 " style={{height: '500px'}}
                                src="https://images.pexels.com/photos/3288102/pexels-photo-3288102.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100 " style={{height: '500px'}}
                                src="https://images.pexels.com/photos/3288103/pexels-photo-3288103.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel> 
                        <div className='col-12 mt-2'>
                            <h2>{requestPropertyObject && requestPropertyObject.details}</h2>
                            <p>Owner of this property : {requestPropertyObject && requestPropertyObject.CurrentOwner}</p>
                            <p>Coral Gables, Florida 33134-2182</p>
                        </div>  

                        <div className="col-12">
                            <div className="row">
                                <div className="col ">
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
        <Footer />
    </div>
  )
}
