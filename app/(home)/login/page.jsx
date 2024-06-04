"use client";
import { auth } from "@/app/firebase/firebaseinit";
import { signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogginIn, setIsLogginIn] = useState(false);
  const [visiblePass, setVisiblePass] = useState(false);

  const router = useRouter();

  const hangelLogin = async (e) => {
    e.preventDefault();
    setIsLogginIn(true);
    toast.info("Checking credentials...", {
      autoClose: false,
      closeOnClick: false,
      toastId: "login-toast",
      theme: "colored",
    });
    if (!email || !password) return;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      toast.update("login-toast", {
        render: "Successfully logged in, you will be redirect shortly.",
        autoClose: 1000,
        closeOnClick: true,
        delay: 0,
        type: "success",
        onClose: () => {
          router.replace("/admin");
        },
      });
    } catch (error) {
      console.log(error);
      toast.update("login-toast", {
        autoClose: 1000,
        render: "Bad credentials",
        closeOnClick: true,
        type: "error",
      });
      setIsLogginIn(false);
    }
  };
  return (
    <main className="min-h-screen flex justify-center items-center bg-[#f1f1f1]">
      <ToastContainer />
      <div className="max-w-4xl w-full shadow-md rounded grid grid-cols-1 md:grid-cols-2 bg-[#f5f5f5]">
        <div className="p-10">
          <Image
            src="/login/login.svg"
            height={200}
            width={200}
            className="w-full"
          />
        </div>
        <form className="p-10" onSubmit={hangelLogin}>
          <h2 className="text-center font-semibold text-3xl mb-10">Login</h2>
          <div className="bg-gray-200 py-2 px-4 rounded-md mb-6 flex justify-between">
            <input
              type="text"
              placeholder="username"
              className="bg-transparent outline-none w-full"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={isLogginIn}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
          <div className="bg-gray-200 py-2 px-4 rounded-md mb-2 flex justify-between">
            <input
              type={visiblePass ? "text" : "password"}
              placeholder="password"
              className="bg-transparent outline-none w-full"
              disabled={isLogginIn}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div onClick={() => setVisiblePass((prev) => !prev)}>
              {visiblePass ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </div>
          </div>
          <p className="text-end text-xs text-blue-400 mb-10 cursor-pointer hover:underline">
            Forgot password?
          </p>
          <button
            type="submit"
            disabled={isLogginIn}
            className="bg-gradient-to-r from-green-400 to-green-600 w-full font-semibold text-white py-2 rounded-full disabled:from-green-200 disabled:to-green-300"
          >
            LOGIN
          </button>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
