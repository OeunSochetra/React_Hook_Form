"use client";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Space, Table, Tag, Button } from "antd";
import { DataType } from "@/type";
import Modalui from "./Modalui";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";

const TableUi = () => {
  const [userDetail, setUerDetail] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isModalOpenDelete, setIsModalOpenDetele] = useState(false);
  const { Column } = Table;

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3030/userDetail");
      const datajson = res.data;
      setUerDetail(datajson);
    } catch (error) {
      console.log("FetchData is error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModalEdit = (user: DataType) => {
    setIsModalEditOpen(true);
    setUser(user);
    console.log("userEdit", user);
  };

  const showModalDelete = (user: DataType) => {
    setIsModalOpenDetele(true);
    setUser(user);
  };

  return (
    <>
      <main className="pt-10">
        <div>
          <Button onClick={showModal} type="primary">
            Button
          </Button>
          <Modalui
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            fetchData={fetchData}
          />
          <ModalEdit
            isModalEditOpen={isModalEditOpen}
            setIsModalEditOpen={setIsModalEditOpen}
            fetchData={fetchData}
            user={user}
          />
          <ModalDelete
            isModalOpenDelete={isModalOpenDelete}
            setIsModalOpenDetele={setIsModalOpenDetele}
            fetch={fetchData}
            user={user}
          />
        </div>
        <div>
          <Table dataSource={userDetail}>
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
            <Column title="Age" dataIndex="age" key="age" />
            <Column title="Address" dataIndex="address" key="address" />

            <Column
              title="Tags"
              dataIndex="tags"
              key="tags"
              render={(tags: string[]) => (
                <>
                  {tags?.map((tag) => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </>
              )}
            />
            <Column title="Invite" dataIndex="invite" key="invite" />

            <Column
              title="Action"
              key="action"
              render={(_: any, record: DataType) => (
                <Space size="middle">
                  <a onClick={() => showModalEdit(record)}>Edit</a>
                  <a onClick={() => showModalDelete(record)}>Delete</a>
                </Space>
              )}
            />
          </Table>
        </div>
      </main>
    </>
  );
};

export default TableUi;
