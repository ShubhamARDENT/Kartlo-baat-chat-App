"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface IUser {
    username: string;
    id: number;
}

const ChatUserList = ({ isModalOpen, setReceiver }: {
    isModalOpen?: boolean
    setReceiver: React.Dispatch<React.SetStateAction<string>>
}) => {

    const client = axios.create({
        baseURL: "http://127.0.0.1:8000/users"
    })


    const [dummyUserData, setDummyUserData] = useState<IUser[]>()

    useEffect(() => {
        client.get('').then((response) => setDummyUserData(response.data))
    }, [])


    return (
        <div className='flex flex-col justify-between h-full'>
            <div className='overflow-y-auto'>
                {dummyUserData?.map((user) => (
                    <div key={user.id}
                        className={`flex items-center ${isModalOpen ? "gap-x-2" : "gap-x-4"}
                            cursor-pointer hover:bg-[#002670] px-2 py-2`}
                        onClick={() => {
                            if (!isModalOpen) {
                                setReceiver(user.username)
                            }
                        }}>
                        {isModalOpen && (
                            <input
                                type="checkbox"
                                className="scale-150 cursor-pointer"
                            />
                        )}
                        <img src="/images/profile.png"
                            alt="user-profile"
                            className='w-10 mx-2' />
                        <div className='flex flex-col'>
                            <span className='text-lg text-white'>{user.username}</span>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default ChatUserList
