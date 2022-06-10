import React from "react";
import { Nav } from "react-bootstrap";
import { useState } from "react";
import { RegisteredUsers } from "./RegisteredUsers";
import { useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { AddRequestedProperties } from "./AddRequestedProperties";
import { PendingRequestsForSelling } from "./PendingRequestsForSelling";
import { PropertyFees } from "./PropertyFees";

export const AdminSection = () => {
    const [tableOfUsers, settableOfUsers] = useState(true);
    const [isRequestToAddProperties, setIsRequestToAddProperties] = useState(false);
    const [isRequestToSellProperties, setIsRequestToSellProperties] = useState(false);
    const [isPropertyFees, setIsPropertyFees] = useState(false);
  
    const { baseUrl, users, setUsers } = useAuth();

    const tableOfUsersBtn = () => {
      setIsRequestToAddProperties(false);
      setIsRequestToSellProperties(false);
      setIsPropertyFees(false);
      settableOfUsers(true);
    };
    const requestToAddPropertiesBtn = () => {
      settableOfUsers(false);
      setIsRequestToSellProperties(false);
      setIsPropertyFees(false);
      setIsRequestToAddProperties(true);
    };
    const requestToSellPropertiesBtn = () => {
      settableOfUsers(false);
      setIsRequestToAddProperties(false);
      setIsPropertyFees(false);
      setIsRequestToSellProperties(true);
    };
    const propertyFeesBtn = () => {
      settableOfUsers(false);
      setIsRequestToAddProperties(false);
      setIsRequestToSellProperties(false);
      setIsPropertyFees(true);
    };
  return (
    <div className="row">
    <div className="col-12 mt-3">
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link
            className={`border ${
              tableOfUsers && "bg-primary text-light "
            }`}
            onClick={tableOfUsersBtn}
          >
            <span>Registered Users</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className={`border ${
              isRequestToAddProperties && "bg-primary text-light "
            }`}
            onClick={requestToAddPropertiesBtn}
          >
            <span>Requests To Add Property</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className={`border ${
              isRequestToSellProperties && "bg-primary text-light "
            }`}
            onClick={requestToSellPropertiesBtn}
          >
            <span>Requests To Sell Property</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className={`border ${
              isPropertyFees && "bg-primary text-light "
            }`}
            onClick={propertyFeesBtn}
          >
            <span>Property Fees</span>
          </Nav.Link>
        </Nav.Item>

      </Nav>
    </div>

    <div className="col-12 mt-3">
      <div className="row">
        {tableOfUsers && <RegisteredUsers />}
        {isRequestToAddProperties && <AddRequestedProperties />}
        {isRequestToSellProperties && <PendingRequestsForSelling />}
        {isPropertyFees && <PropertyFees />}
      </div>
    </div>
  </div>
  )
}
