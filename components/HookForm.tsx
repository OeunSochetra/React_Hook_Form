"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Valueinput {
  email: string;
  password: string;
  value: string;
}

const HookForm = () => {
  const [formData, setFormData] = useState<Valueinput | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Valueinput>();

  // handle to update the value to the db.json
  const saveTodb = async (data: Valueinput) => {
    try {
      await axios.post("http://localhost:3030/user", data);
    } catch (error) {
      console.log("Save data fail", error);
    }
  };

  // function to check the value from user is already exisit.
  const checkifValueExists = async (value: string) => {
    try {
      const res = await axios.get(
        `http://localhost:3030/user/checkValue/${value}`
      );
      return res.data.exisit;
    } catch (error) {
      console.log("Error check is value already exists", error);
      return false;
    }
  };

  const onSubmit: SubmitHandler<Valueinput> = async (data) => {
    // console.log("value from user", data);
    setFormData(data);
    const valueExists = await checkifValueExists(data.value);

    if (valueExists) {
      toast.warning("This Email is already exists", {
        position: toast.POSITION.TOP_LEFT,
      });
    } else {
      try {
        await saveTodb(data);
        toast.success("Create Successfully !", {
          position: toast.POSITION.TOP_LEFT,
        });
      } catch (error) {
        console.log("Save data fail", error);
        toast.error("Failed to save data", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    }
  };

  // function for show eyes and hide eyes
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
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
          <div>
            <input
              className="input relative"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Please input your password",
                minLength: {
                  value: 8,
                  message: "Password at lest 8 charaters",
                },
              })}
            />
            <div
              onClick={handleShowPassword}
              className="text-red-500 text-2xl absolute "
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

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
