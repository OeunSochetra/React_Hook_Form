"use client";
import React from "react";
import { Button, Modal, Form, Input } from "antd";
import { DataType } from "@/type";
import axios from "axios";
import { useEffect } from "react";

interface ModalProp {
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  fetchData: () => void;
  user: DataType;
}

const ModalEdit = ({
  isModalEditOpen,
  setIsModalEditOpen,
  fetchData,
  user,
}: ModalProp) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        address: user.address,
        invite: user.invite,
      });
    }
  }, [user]);
  const handleUpdate = async (data: DataType) => {
    // const payload = {
    //   id: user.id,
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   age: data.age,
    //   address: data.address,
    //   invite: data.invite,
    // };
    try {
      await axios.put(`http://localhost:3030/userDetail/${user.id}`, data);
      fetchData();
      setIsModalEditOpen(false);
    } catch (error) {
      console.log("Save data fail", error);
    }
    console.log("data", data);
  };

  const handlecancel = () => {
    setIsModalEditOpen(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <main>
        <Modal
          title="Add user"
          open={isModalEditOpen}
          onCancel={() => setIsModalEditOpen(false)}
          footer={null}
        >
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleUpdate}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<DataType>
              label="firstName"
              name="firstName"
              rules={[
                { required: true, message: "Please input your firstName!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<DataType>
              label="lastName"
              name="lastName"
              rules={[
                { required: true, message: "Please input your lastName!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<DataType>
              label="age"
              name="age"
              rules={[{ required: true, message: "Please input your age!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<DataType>
              label="address"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input />
            </Form.Item>

            {/* <Form.Item<DataType>
                  label="tags"
                  name="tags"
                  rules={[
                    { required: true, message: "Please input your tags!" },
                  ]}
                >
                  <Input />
                </Form.Item> */}
            <Form.Item<DataType>
              label="invite"
              name="invite"
              rules={[{ required: true, message: "Please input your invite!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button danger onClick={handlecancel}>
                cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </main>
    </>
  );
};

export default ModalEdit;
