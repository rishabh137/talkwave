import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useUpdate from "../../hooks/useUpdate";

const EditProfileModal = ({ authUser }) => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        bio: "",
        newPassword: "",
        currentPassword: "",
    });

    const { updateProfile, isUpdating } = useUpdate()

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (authUser) {
            setFormData({
                fullname: authUser.fullname,
                username: authUser.username,
                email: authUser.email,
                bio: authUser.bio,
                newPassword: "",
                currentPassword: ""
            })
        }
    }, [])

    const handleCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword)
    }

    const handleNewPassword = () => {
        setShowNewPassword(!showNewPassword)
    }

    return (
        <>
            <button
                className='btn btn-outline rounded-full btn-sm'
                onClick={() => {
                    authUser.username === "testuser" ?
                        window.alert("This is a test model. To update the profile, please create a new account. But you can update profile picture.")
                        :
                        document.getElementById("edit_profile_modal").showModal()
                }}
            >
                Edit profile
            </button>
            <dialog id='edit_profile_modal' className='modal'>
                <div className='modal-box border rounded-md border-gray-700 shadow-md'>
                    <h3 className='font-bold text-lg my-3'>Update Profile</h3>
                    <form
                        className='flex flex-col gap-4'
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateProfile(formData)
                        }}
                    >
                        <div className='flex flex-wrap gap-2'>
                            <input
                                type='text'
                                placeholder='Full Name'
                                className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                value={formData.fullname}
                                name='fullname'
                                onChange={handleInputChange}
                            />
                            <input
                                type='text'
                                placeholder='Username'
                                className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                value={formData.username}
                                name='username'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            <input
                                type='email'
                                placeholder='Email'
                                className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                value={formData.email}
                                name='email'
                                onChange={handleInputChange}
                            />
                            <textarea
                                placeholder='Bio'
                                className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                value={formData.bio}
                                name='bio'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            <label className='input border border-gray-700 rounded p-2 input-md flex items-center gap-2'>
                                <input
                                    type={!showCurrentPassword ? 'password' : "text"}
                                    placeholder='Current Password'
                                    className=''
                                    value={formData.currentPassword}
                                    name='currentPassword'
                                    onChange={handleInputChange}
                                />
                                {
                                    !showCurrentPassword ?
                                        <FaEyeSlash cursor="pointer" onClick={handleCurrentPassword} />
                                        :
                                        <FaEye cursor="pointer" onClick={handleCurrentPassword} />
                                }
                            </label>
                            <label className='input border border-gray-700 rounded p-2 input-md flex items-center gap-2'>

                                <input
                                    type={!showNewPassword ? 'password' : "text"}
                                    placeholder='New Password'
                                    className=''
                                    value={formData.newPassword}
                                    name='newPassword'
                                    onChange={handleInputChange}
                                />
                                {
                                    !showNewPassword ?
                                        <FaEyeSlash cursor="pointer" onClick={handleNewPassword} />
                                        :
                                        <FaEye cursor="pointer" onClick={handleNewPassword} />
                                }
                            </label>
                        </div>
                        <button className='btn btn-primary rounded-full btn-sm text-white'>
                            {isUpdating ? <LoadingSpinner size="sm" /> : "Update"}
                        </button>
                    </form>
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button className='outline-none'>close</button>
                </form>
            </dialog>
        </>
    );
};
export default EditProfileModal;