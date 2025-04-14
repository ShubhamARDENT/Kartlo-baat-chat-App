"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function LoginPage() {

    const router = useRouter()
    return (
        <div className="min-h-screen flex justify-evenly items-center"
            style={{ backgroundImage: "url('/images/background.png')" }}
        >
            <img src="/images/chatapp-logo.png" alt="" style={{ width: "20%", height: "30%" }} />

            {/* form section */}
            <div className="bg-white p-8 rounded-xl">
                <form action="" className="flex flex-col gap-5 f">
                    <label className="font-semibold text-2xl">Login </label>
                    <input type="text" placeholder="Email address"
                        className="p-2 border-1 border-gray-400 border-solid rounded-md" />
                    <input type="text" placeholder="password"
                        className="p-2 border-1 border-gray-400 border-solid rounded-md" />
                    <button type="button"
                        onClick={() => router.push("/chats")}
                        className="bg-[#077eff] rounded-md text-white cursor-pointer p-2 text-xl">
                        Login
                    </button>
                    <div className="flex gap-2 text-gray-500 text-sm" >
                        <input type="checkbox" />
                        <p >Agree to the terms of use & privacy policy.</p>
                    </div>
                    <div className="cursor-pointer text-gray-500 flex " >
                        <p className="mr-1">
                            Create an account ?
                        </p>
                        <Link href="/" className="text-[#077eff]">
                            Click here
                        </Link>
                    </div>
                    <div className="cursor-pointer text-gray-500 flex ">
                        <p className="mr-1">
                            Forgot Password ?
                        </p>
                        {/* forgort password link */}
                        <Link href="/" className="text-[#077eff]">
                            Click here
                        </Link>
                    </div>
                </form>

            </div>

        </div >
    )
}