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
import { deleteCategory, getAllCategory } from "../apis/categories";
import { useNavigate } from "react-router-dom";
import BaseAlert from "../component/BaseAlert";
import _ from "lodash";
const Category = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([ ]);

  const renderTable = () => {
    return data.map(({ id, ten, mota, trangthai, createdAt }) => (
      <Tr key={id}>
        <Td>{id}</Td>
        <Td>{ten}</Td>
        <Td>{mota}</Td>
        <Td>{trangthai==0?"Bình thường":"Bản nháp"}</Td>
        <Td>{createdAt}</Td>
        <Td className="flex gap-3">
          <Button>
            <EditIcon
              onClick={() => {
                navigate("/cap-nhat-danh-muc/" + id);
              }}
            />
          </Button>
          <BaseAlert id={id} func={()=>{fetchRemoveCategory(id)}}>
            <DeleteIcon />
          </BaseAlert>
        </Td>
      </Tr>
    ));
  };

  const fetchListCategory = () => {
    getAllCategory().then((result) => {
      const keys = ["id", "ten", "mota", "trangthai", "createdAt", "updatedAt"];
      const newData = _.map(result.data, (item) =>
        _.zipObject(keys, item)
      );
      setData(newData);
    });
  };

  const fetchRemoveCategory = (id) => {
    deleteCategory(id)
      .then((result) => {
        console.log(result);
        fetchListCategory()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchListCategory();
  }, []);
  return (
    <div>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>TÊN DANH MỤC </Th>
              <Th>MÔ TẢ</Th>
              <Th>TRẠNG THÁI</Th>
              <Th>NGÀY TẠO</Th>
              <Th>THAO TÁC</Th>
            </Tr>
          </Thead>
          <Tbody>{renderTable()}</Tbody>
         
        </Table>
      </TableContainer>
    </div>
  );
};

export default Category;
