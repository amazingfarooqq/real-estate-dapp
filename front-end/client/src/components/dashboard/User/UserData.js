import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";

export const UserData = () => {
  const {
    baseUrl,
    users,
    setUsers,
    userInfo,
    realEstateContract,
    tetherTokenContract,
  } = useAuth();

  return (
    <div>
      {userInfo && userInfo.role === "user" && (
        <>
          <div className="row justify-content-around">
            <div className="col-5">
              <div className="wrapperimg">
                <img
                  className="img-fluid"
                  src={`${baseUrl}/${userInfo.profileImage}`}
                  alt="img"
                />
              </div>
            </div>
            <div
              className="col-5"
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <h2
                className="fw-bold p-0 m-0"
                style={{ textTransform: "capitalize" }}
              >
                {userInfo.firstName} {userInfo.lastName}
              </h2>
              <p className="p-0 m-0">{userInfo.address}</p>

              <div className="row justify-content-around">
                <div className="col-12 fs-4">
                  <h5 className="fw-bold" style={{ display: "inline" }}>
                    Birthday
                  </h5>
                  : {userInfo.dob}
                </div>
                <div className="col-12 fs-4">
                  <h5 className="fw-bold" style={{ display: "inline" }}>
                    Age
                  </h5>
                  : {userInfo.age}
                </div>
                <div className="col-12 fs-4">
                  <h5 className="fw-bold" style={{ display: "inline" }}>
                    Phone
                  </h5>
                  : {userInfo.phoneNumber}
                </div>
                <div className="col-12 fs-4">
                  <h5 className="fw-bold" style={{ display: "inline" }}>
                    Email
                  </h5>
                  : {userInfo.email}
                </div>

                <div className="col-12 fs-4">
                  <h5 className="fw-bold" style={{ display: "inline" }}>
                    Approvement:
                  </h5>
                  <span
                    className={`mx-2
                    ${
                      userInfo.approvement == "Approved"
                        ? "text-success"
                        : userInfo.approvement == "Pending"
                        ? "text-warning"
                        : userInfo.approvement == "Rejected"
                        ? "text-danger"
                        : ""
                    }`}
                  >
                    {userInfo.approvement}
                  </span>
                  {userInfo.approvement == "Rejected" && (
                    <div className="text-danger" style={{ fontSize: "15px" }}>
                      Reason: {userInfo.rejectedReason}
                    </div>
                  )}
                </div>

                <div className="col-12 fs-4">
                  <h5 className="fw-bold" style={{ display: "inline" }}>
                    Corporation:
                    {userInfo.isCorporation ? " true " : " false "}
                  </h5>
                  {userInfo.isCorporation ? (
                    <a href={userInfo.corporationName} target="_blank">
                      link
                    </a>
                  ) : (
                    <a href={userInfo.notCorporationName} target="_blank">
                      link
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4 justify-content-center">
            <div className="col-10 col-md-5 py-2 border m-1">
              <span className="fs-5 fw-bold">passport Copy</span>
              <img
                className="w-100"
                src={`${baseUrl}/${userInfo.passportImage}`}
                alt="img"
              />
            </div>

            <div className="col-10 col-md-5 py-2 border m-1">
              <span className="fs-5 fw-bold">Signature For Terms and Conditions</span>
              <img
                className="w-100"
                src={`${baseUrl}/${userInfo.accepttermssignature}`}
                alt="img"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
