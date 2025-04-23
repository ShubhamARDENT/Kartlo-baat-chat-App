// 
"use client"
import { setUserConversation, setUserMessage } from '@/store/slices';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '@/store/store';

interface IUser {
    username: string;
    id: number;
}


interface IConversation {
    user1_id: number,
    user2_id: number
}

const ChatUserList = ({
    isModalOpen,
    setReceiver,
    UserData
}: {
    isModalOpen?: boolean
    UserData: IUser[]
    setReceiver: React.Dispatch<React.SetStateAction<number>>
}) => {

    const Fast_API = process.env.NEXT_PUBLIC_Fast_API
    const dispatch = useDispatch()
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const senderID = useTypedSelector((state) => state.user.senderId);
    const [users, setUsers] = useState<IUser[]>([])
    const [convoList, setConvoList] = useState<any[]>([])
    
    useEffect(() => {
        axios.get(`${Fast_API}/conversations/${senderID}`).then((res) => {
            setConvoList(res.data)
        })
        axios.get(`${Fast_API}/users`).then((res) => {
            setUsers(res.data)
        })
    }, [])

    const getConvoId = async (id: number) => {
        if (id) {
            const res = await axios.get(`${Fast_API}/conversations/${id}`)
            const conversation = res.data.find((convo: any) =>
                (convo.user1_id === senderID && convo.user2_id === id) ||
                (convo.user2_id === senderID && convo.user1_id === id)
            );
            dispatch(setUserConversation(conversation))
        }
    }

    // Choose which list to show: search result or convo list
    const renderList = UserData?.length > 0 ? UserData : convoList

    return (
        <div className='flex flex-col justify-between h-full'>
            <div className='overflow-y-auto'>
                {renderList.map((user: any) => {
                    const userId = user.user1_id && user.user2_id
                        ? (user.user1_id === senderID ? user.user2_id : user.user1_id)
                        : user.id;

                    const userInfo = users.find((u) => u.id === userId);

                    return (
                        <div
                            key={user.id}
                            className={`flex items-center ${isModalOpen ? "gap-x-2" : "gap-x-4"}  
                            cursor-pointer hover:bg-[#002670] px-2 py-2`}
                            onClick={() => {
                                if (!isModalOpen) {
                                    setReceiver(userInfo)
                                    getConvoId(user.user2_id);
                                }
                            }}
                        >
                            {isModalOpen && (
                                <input
                                    type="checkbox"
                                    className="scale-150 cursor-pointer"
                                />
                            )}
                            <img
                                src="/images/profile.png"
                                alt="user-profile"
                                className='w-10 mx-2'
                            />
                            <div className='flex flex-col'>
                                <span className='text-lg text-white'>
                                    {userInfo?.username || "Unknown"}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChatUserList
