import { Alert, AlertIcon, Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { createCategory, getAllCategory } from "../apis/categories";
import _, { result } from "lodash";

const CreateCategory = () => {
  const [input, setInput] = useState({});
  const [alert, setAlert] = useState(null)

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const fetchCreateCategory = () => {
    let data = new FormData();
    _(input).forEach((val, key) => {
      data.append(key, val)
    });
    createCategory(data).then(result => {
      console.log(result)
      setAlert(0)
    }).catch(err => {
      console.log(err)
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



  return (
    <div className="w-1/3 p-5">
      <FormControl>
        <FormLabel>Tên danh mục</FormLabel>
        <Input
          name="ten"
          type="text"
          value={input.ten}
          onChange={handleInput}
        />
        <div className="my-3" />
        <FormLabel>Mô tả</FormLabel>

        <Input
          name="mota"
          type="text"
          value={input.mota}
          onChange={handleInput}
        />
        <div className="my-3" />
        <FormLabel>Trạng thái</FormLabel>

        <Select name={"trangthai"} placeholder='Vui lòng chọn' onChange={handleInput}>
          <option value='0'>Bình thường</option>
          <option value='1'>Bản nháp</option>

        </Select>
        <div className="my-5" />
        {renderAlert()}
        <div className="my-5" />
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={fetchCreateCategory}
        >
          Lưu
        </Button>
      </FormControl>

    </div>
  );
};

export default CreateCategory;
