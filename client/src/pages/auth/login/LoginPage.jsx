import { useState } from "react";
import { NavLink } from "react-router-dom";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "testuser",
        password: "testuser123",
    });
    const [showPassword, setShowPassword] = useState(false)

    const queryClient = useQueryClient()

    const { mutate: loginMutation, isError, isPending, error } = useMutation({
        mutationFn: async ({ username, password }) => {
            try {
                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username, password })
                })

                const data = await res.json()

                if (res.status === 200) {
                    toast.success(`Welcome ${username}`);
                    setFormData({ username: "", password: "" })
                    queryClient.invalidateQueries({ queryKey: ["authUser"] })
                } else {
                    throw new Error(data.error || "Unknown server error");
                }

            } catch (error) {
                toast.error(error.message)
            }
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation(formData)
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className='max-w-screen-xl mx-auto flex h-screen'>
            <div className='flex-1 hidden lg:flex items-center  justify-center'>
                <h1 className=' lg:w-2/3 fill-white mr-40' style={{ fontSize: "25rem" }}>T</h1>
            </div>
            <div className='flex-1 flex flex-col justify-center items-center'>
                <form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
                    <h1 className='w-24 lg:hidden fill-white text-8xl mr-48'>T</h1>
                    <h1 className='text-4xl font-extrabold text-white'>Sign In</h1>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdOutlineMail />
                        <input
                            autoComplete="off"
                            required={true}
                            type='text'
                            className='grow'
                            placeholder='username'
                            name='username'
                            onChange={handleInputChange}
                            value={formData.username}
                        />
                    </label>

                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdPassword />
                        <input
                            autoComplete="off"
                            required={true}
                            type={!showPassword ? 'password' : "text"}
                            className='grow'
                            placeholder='Password'
                            name='password'
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                        {
                            !showPassword ?
                                <FaEyeSlash cursor="pointer" onClick={handlePassword} />
                                :
                                <FaEye cursor="pointer" onClick={handlePassword} />
                        }
                    </label>
                    <button className='btn rounded-full btn-primary text-white'>
                        {isPending ? "Loading..." : "Login"}
                    </button>
                    {isError && <p className='text-red-500'>{error.message}</p>}
                </form>
                <div className='flex flex-col gap-2 mt-4'>
                    <p className='text-white text-lg'>Don't have an account?</p>
                    <NavLink to='/signup'>
                        <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign up</button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;