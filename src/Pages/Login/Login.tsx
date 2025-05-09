/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "../../Redux/Features/Auth/authApi";
import { verifyToken } from "../../Utils/verifyToken";
import { setUser, TUser } from "../../Redux/Features/Auth/authSlice";
import { useAppDispatch } from "../../Redux/hook";
import { MoveLeft } from "lucide-react";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const [loginUser] = useLoginMutation();
  const { register, handleSubmit } = useForm();
  const handelLogin: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Login in progress ........!!");
    const payload = {
      email: data.email,
      password: data.password,
    };
    const res = (await loginUser(payload)) as any;
    if (res.data?.success) {
      console.log(res);
      toast.success("Login successfully", { id: toastId });

      const user = verifyToken(res.data.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.data.accessToken }));
      navigate(state || `/`);
    } else {
      toast.error("Something went wrong!! Please provide valid information", {
        id: toastId,
      });
    }
  };

  return (
    <>
        <div className="login">
                 <div className="border w-[400px] p-8 rounded-lg text-white bg-[#0e4a41]">
            <div className="flex justify-center items-center mb-8"></div>
          <h1 className="text-3xl text-center font-bold text-brandTextSecondary">
            LOGIN NOW{" "}
          </h1>
          <form onSubmit={handleSubmit(handelLogin)}>
            <div className="mt-8">
              <label
                htmlFor="email"
                className="font-semibold tracking-[4px] text-brandTextTertiary"
              >
                EMAIL
              </label>
              <input
                {...register("email")}
                placeholder="Type your email"
                type="email"
                id="email"
                className="w-full border border-brandTextSecondary p-2 rounded-lg bg-transparent outline-none mt-2 placeholder:text-gray-500"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="font-semibold tracking-[4px] text-brandTextTertiary"
              >
                PASSWORD
              </label>
              <input
                {...register("password")}
                placeholder="Ex: ********"
                type="password"
                id="current-password"
                className="w-full border border-brandTextSecondary p-2 rounded-lg bg-transparent outline-none mt-2 placeholder:text-gray-500"
              />
            </div>
            <Button
              htmlType="submit"
              className="w-full mt-8 bg-brandTextSecondary hover:bg-brandTextSecondary/70"
            >
              Login
            </Button>

            <div className="mt-4">
              <p className="text-center text-brandTextTertiary">
                Don't have an account?{" "}
                <Link to="/register" className="text-[#510039] font-semibold">
                  Please Register
                </Link>
              </p>
            </div>
            <Link to="/" className="text-center text-brandTextTertiary">
              <p className="mt-4  text-center text-brandTextTertiary flex items-center justify-center gap-2">
                <MoveLeft></MoveLeft>
                Back to home
              </p>
            </Link>
          </form>
        </div>
       </div>
    </>

  );
};

export default Login;
