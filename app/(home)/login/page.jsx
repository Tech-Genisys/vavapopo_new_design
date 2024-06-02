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
            <Image src="/login/user.svg" width={30} height={30} />
          </div>
          <div className="bg-gray-200 py-2 px-4 rounded-md mb-2 flex justify-between">
            <input
              type="password"
              placeholder="password"
              className="bg-transparent outline-none w-full"
              disabled={isLogginIn}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Image src="/login/lock.svg" width={30} height={30} />
          </div>
          <p className="text-end text-xs text-blue-400 mb-10">
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
