import { Alert, AlertIcon, Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getDeviceDetails, updateDevice } from "../apis/devices";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { getAllCategory } from "../apis/categories";

const UpdateDevice = () => {
  const [input, setInput] = useState({});
  const [alert, setAlert] = useState(null)
  const [listCategory, setListCategory] = useState([])
  const { id } = useParams();
  const handleInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  const fetchUpdateDevice = () => {
    let data = new FormData();
    _(input).forEach((val, key) => {
      data.append(key, val)
    });
    updateDevice(id, data)
      .then((result) => {
        console.log(result);
        setAlert(0)
      })
      .catch((err) => {
        console.log(err);
        setAlert(1)
      });
  };

  const fetchDeviceDetails = () => {
    getDeviceDetails(id).then(result => {

      const keys = ["id", "tenthietbi", "ngaynhap", "ngaysx", "hsx", "loai", "giaban", "soluong", "daban", "createdAt", "updatedAt"];
      const thietBiDetails = _.zipObject(keys, _.head(result.data));
      setInput(thietBiDetails);
      console.log("thietBiDetails", thietBiDetails)
    }).catch(err => { console.log(err) })
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
  useEffect(() => {
    fetchDeviceDetails();
    fetchListCategory();
  }, []);

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
        <FormLabel>Loại thiết bị</FormLabel>

        <Select value={input.loai} name="loai" onChange={handleInput}>

          {listCategory?.map((item, index) => <option value={item?.id}>{item?.ten}</option>)}
        </Select>

        <div className="my-3" />
        <FormLabel>Giá sản phẩm</FormLabel>

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
        <div className="my-3" />
        <FormLabel>Đã bán </FormLabel>

        <Input
          name="daban"
          type="text"
          value={input.daban}
          onChange={handleInput}
        />
        <div className="my-5" />
        {renderAlert()}
        <div className="my-5" />
        <Button
          onClick={fetchUpdateDevice}
          colorScheme="teal"
          variant="outline"
        >
          Lưu
        </Button>
      </FormControl>
    </div>
  );
};

export default UpdateDevice;
