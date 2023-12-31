"use client";

import React, { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { Button, Input } from "@material-tailwind/react";

const LoginPage = () => {

    const userName = useRef("");
    const pass = useRef("");

    const [messageError, setMessageError] = useState("")

    const onSubmit = async () => {
        if (!userName.current || !pass.current) {
            console.error("Username and password are required.");
            setMessageError("กรุณาใส่ข้อมูลให้ครบ")
            return;
        }

        try {
            const result = await signIn("credentials", {
                username: userName.current,
                password: pass.current,
                redirect: true,
                callbackUrl: "/",
            });

            console.log(result);
        } catch (error) {
            console.error("Login error:", error);
        }
    };


    return (
        <div
            className={
                "flex flex-col justify-center items-center  h-screen gap-1 "
            }
        >
            <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">

                <div className="w-72">
                    <Input
                        label="Username"
                        onChange={(e) => (userName.current = e.target.value)}
                    />
                </div>
                <div className="w-72">
                    <Input
                        label="Password"
                        onChange={(e) => (pass.current = e.target.value)}
                    />
                </div>
                <div className="text-red-500 text-sm">
                    {messageError}
                </div>
                <Button onClick={onSubmit}>Login</Button>
            </div>
        </div>
    )
}

export default LoginPage;