"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import React from "react"
export default function Profile() {


    const router = useRouter()
    const [bio, setBio] = React.useState({
        name: "",
        status: ""
    })
    const [imagePreview, setImagePreview] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setBio((prev) => ({
            ...prev,
            [name]: value
        }))
        const file = e.target.files?.[0];

        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }

    }

    return (
        <div className="min-h-[100vh] flex items-center justify-center" style={{ backgroundImage: "url('/images/background.png')" }}>
            <div className="bg-white rounded-xl flex justify-between py-5 px-4 w-[30%]">
                <div className="flex flex-col gap-5 w-[50%]">
                    <span className="font-bold text-xl">Profile details</span>
                    <label htmlFor="avatar"
                        className="text-gray-600 text-lg cursor-pointer flex items-center gap-2">
                        <img src={imagePreview || "/images/profile.png"} alt="upload an image"
                            className="rounded-full h-15 w-15"
                        />
                        <input className="cursor-pointer"
                            type="file" id="avatar" accept="image/png, image/jpeg" hidden
                            onChange={handleChange} />
                        Upload Profile Image
                    </label>
                    <input type="text" placeholder="Your name"
                        value={bio.name}
                        required
                        name="name"
                        onChange={handleChange}
                        className="p-2 border-1 border-gray-400 border-solid rounded-md" />
                    <input type="text" placeholder="hello world"
                        name="status"
                        value={bio.status}
                        required
                        onChange={handleChange}
                        className="p-2 border-1 border-gray-400 border-solid rounded-md" />
                    <button className="bg-[#077eff] text-white p-2 cursor-pointer"
                        onClick={() => router.push("/chats")}>save</button>
                </div>
                {/* when profile picture is upload instead of logo img profile picture is shown */}
                <div className="flex items-center justify-center w-[50%]">
                    <img src={imagePreview || "/images/logochat.png"} alt="chat logo"
                        className={`max-w-[160px] max-h-[300px] rounded-full aspect-square`} />
                </div>
            </div>
        </div>
    )
}