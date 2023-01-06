import { Alert, AlertIcon, Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { createDevice } from "../apis/devices";
import _ from "lodash";
import { getAllCategory } from "../apis/categories";
import { useEffect } from "react";

const CreateDevice = () => {
  const [input, setInput] = useState({});
  const [alert, setAlert] = useState(null)
  const [listCategory, setListCategory] = useState([])
  const handleInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  const fetchCreateDevice = () => {

    let data = new FormData();
    _(input).forEach((val, key) => {
      data.append(key,val)
    });
    createDevice(data)
      .then((result) => {
        console.log("result", result);
        setAlert(0)
      })
      .catch((err) => {
        console.log(err);
        setAlert(1)
      });
  };
  const renderAlert = () => {

    if (alert == null) {
      return ""
    }
    else if (alert == 0) {
      return <Alert status='success' variant='solid'>
        <AlertIcon />
        Tạo mới thành công
      </Alert>
    }
    else if (alert == 1) {
      return <Alert status='error' variant='solid'>
        <AlertIcon />
        Tạo mới thất bại
      </Alert>
    }

  }
  const fetchListCategory = () => {
    getAllCategory().then((result) => {
      const keys = ["id", "ten", "mota", "trangthai", "createdAt", "updatedAt"];
      const newData = _.map(result.data, (item) =>
        _.zipObject(keys, item)
      );

      setListCategory(newData);
    });
  };
  useEffect(()=>{
    fetchListCategory()
  },[])
  return (
    <div className="w-1/3 p-5">
      <FormControl>
        <FormLabel>Tên thiết bị</FormLabel>
        <Input
          name="tenthietbi"
          type="text"
          value={input.tenthietbi}
          onChange={handleInput}
        />
        <div className="my-3" />
        <FormLabel>Ngày nhập</FormLabel>

        <Input
          name="ngaynhap"
          type="text"
          value={input.ngaynhap}
          onChange={handleInput}
        />
        <div className="my-3" />
        <FormLabel>Ngày sản xuất</FormLabel>

        <Input
          name="ngaysx"
          type="text"
          value={input.ngaysx}
          onChange={handleInput}
        />
        <div className="my-3" />
        <FormLabel>Thời hạn</FormLabel>

        <Input
          name="hsx"
          type="text"
          value={input.hsx}
          onChange={handleInput}
        />
        <div className="my-3" />
        <FormLabel>Loại</FormLabel>
        <Select name="loai" onChange={handleInput}>
         
          {listCategory?.map((item, index) => <option value={item?.id}>{item?.ten}</option>)}
        </Select>
    
        <div className="my-3" />
    
        <FormLabel>Giá bán</FormLabel>

        <Input
          name="giaban"
          type="text"
          value={input.giaban}
          onChange={handleInput}
        />
        <div className="my-3" />
        <FormLabel>Số lượng </FormLabel>
        <Input
          name="soluong"
          type="text"
          value={input.soluong}
          onChange={handleInput}
        />
        { renderAlert() }
        <div className="my-5" />
        <Button
          onClick={fetchCreateDevice}
          colorScheme="teal"
          variant="outline"
        >
          Lưu
        </Button>
      </FormControl>
    </div>
  );
};

export default CreateDevice;
