import React from 'react'

export const SectionOne = () => {
  return (
    <div className='container sectionOne mt-5'>
        <div className="row">
            <div className="col desc">
                <h2 className='fw-bold' style={{fontFamily : 'Secular One'}}> Let's Find A Modern <span className='template-color' style={{fontWeight: '1000'}}>Home</span> For You. </h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt sint id quidem vitae quibusdam deserunt sequi odit nulla nihil, quas reiciendis voluptate esse quisquam dolorem doloribus eligendi, aut eveniet molestiae?</p>

              
            </div>
            <div className="col-5 d-none d-lg-block text-end imgs">
                <img src="https://img.wallpapersafari.com/phone/640/1136/94/61/qaQjy0.jpg" alt="" />
            </div>
        </div>
        <div className="row details">
            <div className="col-12 col-lg-9 stuff p-4">
                <div className="row">
                    <div className="col-4">
                        <h3>Property Type</h3>
                        <h5>Lorem ipsum dolor sit.</h5>
                    </div>
                    <div className="col-4">
                        <h3>Property Type</h3>
                        <h5>Lorem ipsum dolor sit.</h5>
                    </div>
                    {/* <div className="col-4">
                        <h3>Property Type</h3>
                        <h5>Lorem ipsum dolor sit.</h5>
                    </div>                     */}
                </div>
            </div>

    </div>
    </div>
  )
}
