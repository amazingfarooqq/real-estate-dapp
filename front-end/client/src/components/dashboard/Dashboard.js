import React from "react";
import { Header } from "../header/Header";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AdminSection } from "./Admin/AdminSection";
import { UserSection } from "./User/UserSection";

export const Dashboard = () => {
  const {
    propertiesObject,
    baseUrl,
    users,
    setUsers,
    userInfo
  } = useAuth();
  const navigate = useNavigate();

  // console.log("totalProperties:", totalProperties);
  // console.log("requestsObject:", requestsObject);
  // console.log("propertiesObject:", propertiesObject);
  // console.log("requestsSellPropertyObject:", requestsSellPropertyObject);
  // console.log("onSellpropertiesObject:", onSellpropertiesObject);


  useEffect(() => {
    axios({
      method: "post",
      url: `${baseUrl}/profiles`,
    })
      .then((res) => {
        if (res.data.status === 200) {
          setUsers(res.data.getUsers);
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log("error at admin");
      });
  }, [users]);

  useEffect(() => {
    if (
      userInfo &&
      (userInfo.role === "owner" ||
        userInfo.role === "admin" ||
        userInfo.role === "user")
    ) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <div>
      <Header />

      <div className="container-fluid">
        {userInfo &&
          (userInfo.role === "admin" || userInfo.role === "owner") && (
            <AdminSection />
          )}
        {userInfo && userInfo.role === "user" && <UserSection />}
      </div>
    </div>
  );
};
