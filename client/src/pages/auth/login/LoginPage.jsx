import { useState } from "react";
import { NavLink } from "react-router-dom";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isError = false;

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
                            type='password'
                            className='grow'
                            placeholder='Password'
                            name='password'
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                    </label>
                    <button className='btn rounded-full btn-primary text-white'>Login</button>
                    {isError && <p className='text-red-500'>Something went wrong</p>}
                </form>
                <div className='flex flex-col gap-2 mt-4'>
                    <p className='text-white text-lg'>{"Don't"} have an account?</p>
                    <NavLink to='/signup'>
                        <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign up</button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;