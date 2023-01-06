import { Alert, AlertIcon, Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { getCategoryDetails, updateCategory } from "../apis/categories";
import { useParams } from "react-router-dom";

const UpdateCategory = () => {
  const [input, setInput] = useState({});
  const [alert, setAlert] = useState(null)
  const { id } = useParams();
  const handleInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const fetchUpdateCategory = () => {
    let data = new FormData();
    _(input).forEach((val, key) => {
      data.append(key, val)
    });
    updateCategory(id, data)
      .then((result) => {
        console.log(result);
        setAlert(0)
      })
      .catch((err) => {
        console.log(err);
        setAlert(1)
      });
  };

  const fetchCategoryDetails = () => {
    getCategoryDetails(id)
      .then((result) => {
        const keys = ["id", "ten", "mota", "trangthai", "createdAt", "updatedAt"];
        const newCategory = _.zipObject(keys, result.data[0])
        setInput(newCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const renderAlert = () => {
 
    if (alert == null) {
      return ""
    }
    else if (alert == 0) {
      return <Alert status='success' variant='solid'>
        <AlertIcon />
        Cập nhật thành công
      </Alert>
    }
    else if (alert == 1) {
      return <Alert status='error' variant='solid'>
        <AlertIcon />
        Cập nhật thất bại
      </Alert>
    }

  }
  useEffect(() => {
    fetchCategoryDetails();
  }, []);

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

        <Select value={input.trangthai} name={"trangthai"} onChange={handleInput}>
          <option value='0'>Bình thường</option>
          <option value='1'>Bản nháp</option>

        </Select>
        <div className="my-5" />
        {renderAlert()}
        <div className="my-5" />
        <Button
          onClick={fetchUpdateCategory}
          colorScheme="teal"
          variant="outline"
        >
          Lưu
        </Button>
      </FormControl>
    </div>
  );
};

export default UpdateCategory;
