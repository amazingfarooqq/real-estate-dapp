import React from 'react'
import { GoLocation } from 'react-icons/go';
import { Link } from 'react-router-dom'


export const Property = (props) => {
  return (
    <div className="col-11 col-lg-4 p-3">
        <img className='w-100 rounded' style={{height: '250px'}} src={props.img} alt="img" />

        <div className="row px-2">
            <div className="col">
                <GoLocation /> Karachi, Pakistan
            </div>

            <div className="col text-end">
                <h4 className='p-0 m-0'>$2321</h4>
            </div>

            <div className="col-12">
                <h4 className='p-0 m-0'>{props.title}</h4>
            </div>
                
        </div>

         <Link className='btn btn-color py-1 mx-2 px-5' to="/properyDetails">More Details</Link>


</div>
  )
}
