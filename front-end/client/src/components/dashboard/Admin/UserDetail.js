import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
// import './admin.css'

export const UserDetail = (props) => {
  const { baseUrl ,users , userInfo } = useAuth();

  const [user, setUser] = useState(users.find(user => user._id == props.getid))
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(false)

  const [approvedInput,setApprovedInput]=useState(user.approvement);
  const [roleIs, setRoleIs] = useState(user.role)
  const [rejectedReason, setRejectedReason] = useState(user.rejectedReason)

  

  // handle change just for  changing roles
  function handleOnIsRole(e) {
    setRoleIs(e.target.value);
    console.log(roleIs)
  }


  // handle change just for user approving request
  const handleChangeOnApproved =(e)=>{
    if(e.target.value === "Approved"){
      setApprovedInput('Approved');
      setRejectedReason('')

    }
    if(e.target.value === "Pending") {
      setApprovedInput('Pending');
      setRejectedReason('')

    }
    if(e.target.value === "Rejected") {
      setApprovedInput('Rejected');
    }
   }

   // handle on rejection
   const handleChangeOnRejectedReason = (e) => {
    if(approvedInput === "Rejected") {
      setRejectedReason(e.target.value)
    } else {
      setRejectedReason('')
    }
   }

   // ON SUBMITTONG FORM
   const handleOnSubmit = (e) => {
     e.preventDefault()
     console.log(approvedInput);
     setDisabled(true)
    axios({
      method: 'post',
      url: `${baseUrl}/updateuser`,
      data: {
        email: user.email,
        approvement: approvedInput,
        roleIs: roleIs,
        rejectedReason: rejectedReason
      },
    }).then(res => {
      setDisabled(false)
      setShow(false)
    }).catch(err => {
      console.log('error at admin');
    })
  }

  // SHOW MODAL
  function handleShow(breakpoint) { 
    setFullscreen(breakpoint);
    setShow(true);
    const us = users.find(user => user._id === props.getid)
    console.log(us);
    setUser(us)
  }

  return (
    <>
      <Button className="w-100" onClick={() => handleShow(true)}>
        Details
      </Button>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleOnSubmit}>
            <div className="container">
              <div className="row justify-content-around">
                <div className="col-5">
                  <div className="wrapperimg">
                    {/* {console.log(`${baseUrl}/${user.profileImage}`)} */}
                   <img  className="img-fluid" src={`${baseUrl}/${user.profileImage}`} alt="img" />
                  </div>
                </div>
                <div className="col-5" style={{display: 'flex' , justifyContent: 'center', flexDirection: 'column'}}>
                  <h2 className="fw-bold p-0 m-0" style={{textTransform: 'capitalize'}}>{user.firstName} {user.lastName}</h2>
                  <p className="p-0 m-0">{user.address}</p>

                  <div className="row justify-content-around">
                    <div className="col-12 fs-4"><h5 className="fw-bold" style={{display: 'inline'}}>Birthday</h5>: {user.dob}</div>
                    <div className="col-12 fs-4"><h5 className="fw-bold" style={{display: 'inline'}}>Age</h5>: {user.age}</div>
                    <div className="col-12 fs-4"><h5 className="fw-bold" style={{display: 'inline'}}>Phone</h5>: {user.phoneNumber}</div>
                    <div className="col-12 fs-4"><h5 className="fw-bold" style={{display: 'inline'}}>Email</h5>: {user.email}</div>
                    <div className="col-12 fs-4"><h5 className="fw-bold" style={{display: 'inline'}}>Role</h5>: {user.role}</div>
                    <div className="col-12 fs-4"><h5 className="fw-bold" style={{display: 'inline'}}>Agency</h5>: {user.isAgency ? "true" : "false"}</div>
                    
                    <div className="col-12 fs-4"><h5 className="fw-bold" style={{display: 'inline'}}>Approvement:</h5>
                    <span className={`mx-2
                    ${user.approvement == "Approved" ? 'text-success' : 
                    user.approvement == "Pending" ? 'text-warning' : 
                    user.approvement == "Rejected" ? 'text-danger' : ""}`}>
                    {user.approvement}</span>
                    
                    </div>

                    <div className="col-12 fs-4">
                      <h5 className="fw-bold" style={{display: 'inline'}}>Corporation: 
                       {user.isCorporation ? " true " : " false "} 
                      </h5>
                      {user.isCorporation ? 
                      <a href={user.corporationName} target="_blank">link</a> : 
                      <a href={user.notCorporationName} target="_blank">link</a>}
                    </div>

                    <div className="my-2">
                      <span className="mx-1">
                        <input className="mx-1" type="radio" value="Approved" id="Approved"
                          onChange={handleChangeOnApproved} name="approvedInput" />
                        <label htmlFor="Approved">Approved</label>
                      </span>

                      <span className="mx-1">
                        <input className="mx-1" type="radio" value="Pending" id="Pending"
                          onChange={handleChangeOnApproved} name="approvedInput"/>
                        <label htmlFor="Pending">Pending</label>
                      </span>

                      <span className="mx-1">
                        <input className="mx-1" type="radio" value="Rejected"  id="Rejected" 
                          onChange={handleChangeOnApproved} name="approvedInput"/>
                        <label htmlFor="Rejected">Rejected</label>
                      </span>
                     
                    </div>

                  {approvedInput === "Rejected" &&
                    <input placeholder='Rejected Reason' type="text" className='col-10 fs-4 px-3 py-1 mb-2' name='rejectedReason' value={rejectedReason} onChange={handleChangeOnRejectedReason}/>} 


                  {userInfo.role === "owner" &&           
                    <select
                      defaultValue={roleIs}
                      onChange={handleOnIsRole}
                      className="col-11 fs-4 browser-default custom-select">
                        
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="owner">Owner</option>

                    </select>
                  }

                  </div>
                  <button type='submit' className="btn btn-primary mt-1 mx-1 fs-5" disabled={disabled}>{disabled ?<Spinner animation="border" /> : 'CLICK TO SAVE CHANGES'}</button>
                  
                </div>
              </div>

              <div className="row mt-4 justify-content-center">
            <div className="col-10 col-md-5 py-2 border m-1">
              <span className="fs-5 fw-bold">passport Copy</span>
              <img
                className="w-100"
                src={`${baseUrl}/${user.passportImage}`}
                alt="img"
              />
            </div>

            <div className="col-10 col-md-5 py-2 border m-1">
              <span className="fs-5 fw-bold">Signature For Terms and Conditions</span>
              <img
                className="w-100"
                src={`${baseUrl}/${user.accepttermssignature}`}
                alt="img"
              />
            </div>
          </div>
            </div>
          </form>
            
        </Modal.Body>
      </Modal>
    </>
  );
};
