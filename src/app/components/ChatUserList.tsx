"use client"
import { setUserMessage } from '@/store/slices';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


interface IUser {
    username: string;
    id: number;
}

const ChatUserList = ({ isModalOpen, setReceiver, conversationId }: {
    isModalOpen?: boolean
    conversationId: {}
    setReceiver: React.Dispatch<React.SetStateAction<number>>
}) => {
    const Fast_API = process.env.NEXT_PUBLIC_Fast_API

    const senderID = useSelector((state) => state?.user?.senderId);
    // console.log(senderID, "userloginid")
    const client = axios.create({
        baseURL: `${Fast_API}/conversations/${senderID}`
    })

    const [UserData, setUserData] = useState<IUser[]>()
    const [users, setUsers] = useState([])

    useEffect(() => {
        client.get('').then((response) => setUserData(response.data))
        axios.get(`${Fast_API}/users`).then((res) => setUsers(res.data))
    }, [])

    const dispatch = useDispatch()

    const getMsgApi = async (convoId:number) => {
        const res = await axios.get(`${Fast_API}/messages/conversation/${convoId}`)
        // use redux 
        dispatch(setUserMessage(res.data))
    }

    return (
        <div className='flex flex-col justify-between h-full'>
            <div className='overflow-y-auto'>
                {UserData?.map((user) => {
                    const data = users?.find((data) => data?.id === user?.user2_id)

                    return (
                        <div key={user.id}
                            className={`flex items-center ${isModalOpen ? "gap-x-2" : "gap-x-4"}
                            cursor-pointer hover:bg-[#002670] px-2 py-2`}
                            onClick={() => {
                                if (!isModalOpen) {
                                    setReceiver(user.id)
                                    getMsgApi(user.id)
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
                                <span className='text-lg text-white'>{data?.username}</span>
                            </div>
                        </div>
                    )
                })}
            </div>


        </div >
    )
}

export default ChatUserList
