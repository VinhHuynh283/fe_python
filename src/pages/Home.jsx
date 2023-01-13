import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import BaseAlert from "../component/BaseAlert";
import { deleteDevice, getAllDevices } from "../apis/devices";
import _ from "lodash";
import { getAllCategory } from "../apis/categories";
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [search,setSearch]=useState(null)
  const fetchListCategory = () => {
    getAllCategory().then((result) => {
      const keys = ["id", "ten", "mota", "trangthai", "createdAt", "updatedAt"];
      const newData = _.map(result.data, (item) => _.zipObject(keys, item));

      setListCategory(newData);
    });
  };
  const renderTable = () => {
    return data.map(
      (
        { id, tenthietbi, ngaynhap, ngaysx, hsx, loai, giaban, soluong, daban },
        index
      ) => (
        <Tr key={id} className="bg-white">
          <Td>
            <div className="m-4">{++index}</div>
          </Td>
          <Td>{tenthietbi}</Td>
          <Td>{ngaynhap}</Td>
          <Td>{ngaysx}</Td>
          <Td>{hsx} tháng</Td>
          <Td>{renderType(loai)}</Td>
          <Td>{giaban.toLocaleString("vi-VN")} đ</Td>
          <Td>{soluong.toLocaleString("vi-VN")}</Td>
          <Td>{daban.toLocaleString("vi-VN")}</Td>
          <Td className="">
            <div className="m-4 flex gap-6">
              <a>
                <EditIcon
                  onClick={() => {
                    navigate("/cap-nhat-thiet-bi/" + id);
                  }}
                />
              </a>
              <a
                id={id}
                onClick={() => {
                  fetchRemoveDevice(id);
                }}
              >
                <DeleteIcon />
              </a>
            </div>
          </Td>
        </Tr>
      )
    );
  };
  const fetchListDevice = () => {
    getAllDevices().then((result) => {
      const keys = [
        "id",
        "tenthietbi",
        "ngaynhap",
        "ngaysx",
        "hsx",
        "loai",
        "giaban",
        "soluong",
        "daban",
        "createdAt",
        "updatedAt",
      ];
      const newData = _.map(result.data, (item) => _.zipObject(keys, item));
      setData(newData);
    });
  };

  const fetchRemoveDevice = (id) => {
    deleteDevice(id)
      .then((result) => {
        console.log(result);
        fetchListDevice();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderType = (loai) => {
    return listCategory.find((item) => item.id == loai)?.ten;
  };
  const handleSearch=(e)=>{
    setSearch(e.target.value)
  }
  const onSearch=()=>{
    if(search==""){
      return true
    }
    const newData=data.filter((item,index)=>{

      return item.tenthietbi.toLowerCase().includes(search.toLowerCase()) 
    })
    setData(newData)
  }

  useEffect(() => {
    console.log("running");
    fetchListDevice();
    fetchListCategory();
  }, []);
  return (
    <div>
      <div className="p-3 flex justify-end">
        <input onChange={handleSearch} className="border p-1" type="Nhập tên" />
        <button onClick={onSearch} className="bg-blue-100 p-1 px-2 border ">Tìm kiếm</button>
      </div>
      <TableContainer>
        <Table size="sm">
          <Thead className="py-2">
            <Tr className="bg-blue-50">
              <Th>
                <div className="m-5">STT</div>
              </Th>
              <Th>TÊN THIẾT BỊ</Th>
              <Th>NGÀY NHẬP</Th>
              <Th>NĂM SẢN XUẤT</Th>
              <Th>HẠN SỬ DỤNG</Th>
              <Th>LOẠI</Th>
              <Th>GIÁ BÁN</Th>
              <Th>SỐ LƯỢNG</Th>
              <Th>ĐÃ BÁN</Th>
              <Th>THAO TÁC</Th>
            </Tr>
          </Thead>
          <Tbody>{renderTable()}</Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
