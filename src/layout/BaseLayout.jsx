import { Button } from "@chakra-ui/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const BaseLayout = (props) => {
  return (
    <div className="grid grid-cols-8">
      <div className="col-span-1 border h-screen flex flex-col p-4  ">
        <span role={"button"} className="my-1 font-semibold text-blue-900">
          <Link to={"/danh-muc"}>Danh mục thiết bị</Link>
        </span>
        <span role={"button"} className="my-1 font-semibold text-blue-900">
          <Link to={"/tao-danh-muc"}>Tạo mới danh mục</Link>
        </span>
        <span role={"button"} className="my-1 font-semibold text-blue-900">
          <Link to={"/"}>Danh sách thiết bị</Link>
        </span>
        <span role={"button"} className="my-1 font-semibold text-blue-900">
          <Link to={"/tao-thiet-bi"}>Tạo mới thiết bị</Link>
        </span>
      </div>
      <div className="col-span-7">
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;
