import React, { useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import { DataType } from "@/type";

interface ModalDeleteProps {
  isModalOpenDelete: boolean;
  setIsModalOpenDetele: (isModalOpenDelete: boolean) => void;
  fetch: () => void;
  user: DataType;
}

const ModalDelete = (props: ModalDeleteProps) => {
  const { isModalOpenDelete, setIsModalOpenDetele, fetch, user } = props;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3030/userDetail/${user.id}`);
      fetch();
      setIsModalOpenDetele(false);
    } catch (error) {
      console.log("Delete is error ", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpenDetele(false);
  };

  return (
    <>
      <Modal
        title="Confirm"
        open={isModalOpenDelete}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>Do you want to delete this user ?</p>
      </Modal>
    </>
  );
};

export default ModalDelete;
