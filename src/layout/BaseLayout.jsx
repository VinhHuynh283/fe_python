import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, Outlet, useLocation ,useNavigate} from "react-router-dom";

const BaseLayout = (props) => {
  let location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
  
    const temp = JSON.parse(sessionStorage.getItem("isLogin")) || false
    if (!temp) 
      navigate("/login")
  }, [location?.pathname])
  return (
    <div className="grid grid-cols-8 ">
      <div className="col-span-1 border h-screen flex flex-col p-4  bg-slate-700 text-white">
        <h1 className="text-2xl font-semibold text-white mb-6"> YourApp :))</h1>
        <hr  className="mb-6"/>
        <span role={"button"} className="my-1 font-semibold ">
          <Link to={"/danh-muc"}>Danh mục thiết bị</Link>
        </span>
        <span role={"button"} className="my-1 font-semibold ">
          <Link to={"/tao-danh-muc"}>Tạo mới danh mục</Link>
        </span>
        <span role={"button"} className="my-1 font-semibold ">
          <Link to={"/"}>Danh sách thiết bị</Link>
        </span>
        <span role={"button"} className="my-1 font-semibold ">
          <Link to={"/tao-thiet-bi"}>Tạo mới thiết bị</Link>
        </span>
      </div>
      <div className="col-span-7 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;
