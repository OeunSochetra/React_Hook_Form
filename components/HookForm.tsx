"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface input {
  email: string;
  password: string;
}

const HookForm = () => {
  const [formData, setFormData] = useState<input | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<input>();

  const saveTodb = async (data: input) => {
    try {
      await axios.post("http://localhost:3030/user", data);
    } catch (error) {
      console.log("Save data fail", error);
    }
  };

  const onSubmit: SubmitHandler<input> = (data) => {
    // console.log("value from user", data);
    setFormData(data);
    saveTodb(data);
    toast.success("Create Successfully !", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="reletive flex flex-col gap-5 items-center justify-center pt-[100px] text-black">
          <input
            className="input "
            placeholder="Email"
            type="text"
            {...register("email", {
              required: "Please input your email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalit email address",
              },
            })}
          />
          <p className="text-red-500  ">
            {errors.email && <span>{errors.email.message}</span>}
          </p>

          {/* <p className="text-red-400">{formData?.email}</p> */}

          <input
            className="input"
            placeholder="Password"
            type="text"
            {...register("password", {
              required: "Please input your password",
              minLength: {
                value: 8,
                message: "Password at lest 8 charaters",
              },
            })}
          />
          <p className="text-red-500  ">
            {errors.password && <span>{errors.password.message}</span>}
          </p>

          <div className="pt-10">
            <button className="button">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default HookForm;
