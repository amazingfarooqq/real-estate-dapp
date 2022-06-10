
import { Header } from '../header/Header'

import { BiPhoneCall } from 'react-icons/bi'
import { FiPhoneCall } from 'react-icons/fi'
import { MdEmail } from 'react-icons/md'
import { GoLocation } from 'react-icons/go'
import { Footer } from '../footer/Footer'

export const Contact = () => {
  return (

    <div>

      <Header />

    <div className="container py-5">
      <img className='mb-4 w-100 mt-0 py-0' height="500px" src="https://st2.depositphotos.com/1265075/7446/i/450/depositphotos_74468913-stock-photo-contact-us-icons-on-cubes.jpg" alt="" />
      <form>
        <h1>Contact Us</h1>
        <p>Our professional staff is passionate about our clients’ goals, and aim to treat each client as if they were our only one. Together, your next real estate experience will not only be enjoyable but also produce great results! Please feel free to give us a call, or send an email anytime and we will contact you as soon as possible.</p>
          <hr />

      <div className="row mt-5">
        <div className="col-12 col-lg-6">
          <h4 className="py-4">Santa Stella Real Estate</h4>
          <p> <BiPhoneCall className='fs-3'/> (786) 426-6362</p>
          <p> <FiPhoneCall className='fs-3'/> Office: (786) 409-7439</p>
          <p> <MdEmail className='fs-3'/> info@santastellarealestate.com</p>
          <p> <GoLocation className='fs-3'/> 306 Alcazar Ave. # PH, Coral Gables, FL 33134</p>
        </div>
        <div className="col-12 col-lg-6">

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="first">First Name</label>
              <input type="text" className="form-control" placeholder="" id="first" />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="last">Last Name</label>
              <input type="text" className="form-control" placeholder="" id="last" />
            </div>
          </div>
        
        </div>

        <div className="row">
          <div className="col-12">

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="email"/>
            </div>
          </div>

        </div>

        <div className="row">
          <div className="col-12">

            <div className="form-group">
              <label htmlFor="email">Message </label> <br />
              <textarea className='w-100' name="" id="" cols="30" rows="10"></textarea>
            </div>
          </div>

        </div>

        <button type='button' className="btn btn-primary mt-1">Submit</button>

        </div>
      </div>

    
      </form>
    </div>

    <Footer />

    </div>

    
  )
}
