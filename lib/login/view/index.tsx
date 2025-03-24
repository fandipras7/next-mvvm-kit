"use client"

import { Button } from "@/components/base/button"
import { Input } from "@/components/base/input"
import InputPassword from "@/components/module/InputPassword"
import { useLoginStore } from "../store"
import { useLogin } from "../view-model"
import QueryWrapper from "@/components/module/query-wrapper"

const Content = () => {
    const { email, password, setEmail, setPassword } = useLoginStore();
    const {
        isError,
        isLoading,
        login
    } = useLogin()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login();
    };

    return (
        <div className="w-screen h-screen bg-white lg:flex">
            <div className="hidden w-full h-full bg-[#2395FF] lg:block">

            </div>
            <div className="w-full h-full flex flex-col justify-center items-center space-y-8">
                <h1 className="text-black font-bold text-3xl">Login</h1>
                <form action="" className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
                    <Input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputPassword value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="flex justify-center">
                        <Button type="submit" variant="destructive" className="w-full bg-blue-500">
                            {isLoading ? "Please wait..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const Login = () => {
    return (
        <QueryWrapper>
            <Content />
        </QueryWrapper>
    )
}

export default Login