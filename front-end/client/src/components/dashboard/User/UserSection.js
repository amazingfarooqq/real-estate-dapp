import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
import { ApprovedProperties } from "./ApprovedProperties";
import { PendingPropertyRequests } from "./PendingPropertyRequests";
import { ApprovedSellProperties } from "./ApprovedSellProperties";
import { PendingSellProperties } from "./PendingSellProperties";
import { UserData } from "./UserData";
import { RejectedRequests } from "./RejectedRequests";

export const UserSection = () => {
  const [userData, setUserData] = useState(true)
  const [pendingAddProperties, setPendingAddProperties] = useState(false)
  const [approvedProperties, setApprovedProperties] = useState(false)
  const [onSellpendingProperties, setOnSellpendingProperties] = useState(false)
  const [onSellapprovedProperties, setOonSellapprovedProperties] = useState(false)
  const [rejectedProperties, setRejectedProperties] = useState(false)

  const { realEstateContract, tetherTokenContract } = useAuth();

  const userDataFunction = () => {
    setPendingAddProperties(false)
    setApprovedProperties(false)
    setOnSellpendingProperties(false)
    setOonSellapprovedProperties(false)
    setRejectedProperties(false)
    setUserData(true)
  }

  const pendingAddPropertiesFunction = () => {
    setUserData(false)
    setApprovedProperties(false)
    setOnSellpendingProperties(false)
    setOonSellapprovedProperties(false)
    setRejectedProperties(false)
    setPendingAddProperties(true)
  }

  const approvedAddPropertiesFunction = () => {
    setUserData(false)
    setPendingAddProperties(false)
    setOnSellpendingProperties(false)
    setOonSellapprovedProperties(false)
    setRejectedProperties(false)
    setApprovedProperties(true)
  }

  const onSellpendingPropertiesFunction = () => {
    setUserData(false)
    setPendingAddProperties(false)
    setApprovedProperties(false)
    setOonSellapprovedProperties(false)
    setRejectedProperties(false)
    setOnSellpendingProperties(true)
  }

  const onSellapprovedPropertiesFunction = () => {
    setUserData()
    setPendingAddProperties(false)
    setApprovedProperties(false)
    setOnSellpendingProperties(false)
    setRejectedProperties(false)
    setOonSellapprovedProperties(true)
  }

  const rejectedPropertiesFunction = () => {
    setUserData()
    setPendingAddProperties(false)
    setApprovedProperties(false)
    setOnSellpendingProperties(false)
    setOonSellapprovedProperties(false)
    setRejectedProperties(true)
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mt-3">
          <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link className={`border ${userData && "bg-primary text-light"}`} onClick={userDataFunction}>
                <span>User Details</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={`border ${rejectedProperties && "bg-primary text-light "}`} onClick={rejectedPropertiesFunction}>
                <span>Rejected Properties</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={`border ${pendingAddProperties && "bg-primary text-light "}`} onClick={pendingAddPropertiesFunction}>
                <span>Pending Add Properties</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={`border ${approvedProperties && "bg-primary text-light "}`} onClick={approvedAddPropertiesFunction}>
                <span>Approved Properties</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={`border ${onSellpendingProperties && "bg-primary text-light "}`} onClick={onSellpendingPropertiesFunction}>
                <span>On Sell pending Properties</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={`border ${onSellapprovedProperties && "bg-primary text-light "}`} onClick={onSellapprovedPropertiesFunction}>
                <span>On Sell approved Properties</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <div className="col-12 mt-3">
            {userData && <UserData />}
            {pendingAddProperties && <PendingPropertyRequests />}
            {approvedProperties && <ApprovedProperties />}
            {onSellpendingProperties && <PendingSellProperties />}
            {onSellapprovedProperties && <ApprovedSellProperties />}
            {rejectedProperties && <RejectedRequests />}
        </div>
      </div>
    </div>
  );
};
