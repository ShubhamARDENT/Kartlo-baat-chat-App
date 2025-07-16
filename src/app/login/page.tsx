"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { tree } from "next/dist/build/templates/app-page";
import { useDispatch } from 'react-redux';
import { setSenderId, setSenderName } from '../../store/slices';


export default function LoginPage() {
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });
    const [agree, setAgree] = useState(false)
    const dispatch = useDispatch()
    const [error, setError] = useState<string | null>(null);  // For error handling
    const router = useRouter();

    const client = axios.create({
        baseURL: 'http://127.0.0.1:8000/login',
    });

    const handleLogInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await client.post("", {
                email: userLogin.email,
                password: userLogin.password,
            });


            //* storing username in global store
            const { id, username } = response.data

            dispatch(setSenderId(id))

            dispatch(setSenderName(username))

            // Redirect to chats page
            router.push('/chats');
        } catch (error: any) {
            // Handle error (incorrect credentials or server issues)
            if (error.response) {
                setError(error.response.data.detail || "Login failed. Please try again.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserLogin((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen flex justify-evenly items-center"
            style={{ backgroundImage: "url('/images/background.png')" }}
        >
            <img src="/images/chatapp-logo.png" alt="Chat app logo" style={{ width: "20%", height: "30%" }} />

            <div className="bg-white w-[20%] p-8 rounded-xl">
                <form onSubmit={handleLogInSubmit} className="flex flex-col gap-5">
                    <label className="font-semibold text-2xl">Login</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={userLogin.email}
                        onChange={handleChange}
                        className="p-2 border-1 border-gray-400 border-solid rounded-md"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={userLogin.password}
                        onChange={handleChange}
                        className="p-2 border-1 border-gray-400 border-solid rounded-md"
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={!userLogin.email || !userLogin.password }
                        className="bg-[#077eff] rounded-md text-white cursor-pointer p-2 text-xl"
                    >
                        Login
                    </button>

                  

                    {/* links */}
                    <div className="cursor-pointer text-gray-500 flex">
                        <p className="mr-1">Create an account?</p>
                        <Link href="/" className="text-[#077eff]">
                            Click here
                        </Link>
                    </div>

                    <div className="cursor-pointer text-gray-500 flex">
                        <p className="mr-1">Forgot Password?</p>
                        <Link href="/forgot-password" className="text-[#077eff]">
                            Click here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
