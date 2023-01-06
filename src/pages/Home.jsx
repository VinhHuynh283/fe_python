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
  const [data, setData] = useState([

  ]);
  const [listCategory, setListCategory] = useState([])
  const fetchListCategory = () => {
    getAllCategory().then((result) => {
      const keys = ["id", "ten", "mota", "trangthai", "createdAt", "updatedAt"];
      const newData = _.map(result.data, (item) =>
        _.zipObject(keys, item)
      );

      setListCategory(newData);
    });
  };
  const renderTable = () => {
    return data.map(
      ({
        id,
        tenthietbi,
        ngaynhap,
        ngaysx,
        hsx,
        loai,
        giaban,
        soluong,
        daban,
      },index) => (
        <Tr key={id}>
          <Td>{++index}</Td>
          <Td>{tenthietbi}</Td>
          <Td>{ngaynhap}</Td>
          <Td>{ngaysx}</Td>
          <Td>{hsx}</Td>
          <Td>{renderType(loai)}</Td>
          <Td>{giaban}</Td>
          <Td>{soluong}</Td>
          <Td>{daban}</Td>
          <Td className="flex gap-3">
            <Button>
              <EditIcon
                onClick={() => {
                  navigate("/cap-nhat-thiet-bi/" + id);
                }}
              />
            </Button>
            <BaseAlert
              id={id}
              func={() => {
                fetchRemoveDevice(id);
              }}
            >
              <DeleteIcon />
            </BaseAlert>
          </Td>
        </Tr>
      )
    );
  };
  const fetchListDevice = () => {
    getAllDevices().then((result) => {

      const keys = ["id", "tenthietbi", "ngaynhap", "ngaysx", "hsx", "loai", "giaban", "soluong", "daban", "createdAt", "updatedAt"];
      const newData = _.map(result.data, (item) =>
        _.zipObject(keys, item)
      );
      setData(newData);
    });
  };

  const fetchRemoveDevice = (id) => {
    deleteDevice(id)
      .then((result) => {
        console.log(result);
        fetchListDevice()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderType=(loai)=>{
    return listCategory.find(item => item.id == loai)?.ten
  }

  useEffect(() => {
    console.log("running")
    fetchListDevice();
    fetchListCategory()
  }, []);
  return (
    <div>
      <TableContainer>
        <Table size="sm">
          <Thead className="py-2">
            <Tr>
              <Th>STT</Th>
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
