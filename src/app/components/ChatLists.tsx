"use client"
import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google'
import ChatUserList from './ChatUserList'
import { Search, Ellipsis, AwardIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import axios from "axios"
import { error } from 'console'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
    display: 'swap',
})

interface IUser {
    username: string;
    id: number;
}

const ChatLists = ({ setIsModalOpen, setReceiver, }: {
    setReceiver: React.Dispatch<React.SetStateAction<number>>
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const FastApi = process.env.NEXT_PUBLIC_Fast_API
    const [UserData, setUserData] = useState<IUser[]>([])
    const [userName, setUserName] = useState("")
    const router = useRouter()
    const [isVisible, setVisible] = useState(false)
    const { senderId, senderUsername } = useSelector((state) => state?.user);

    const handleMenu = () => {
        setVisible(prev => !prev)
    }

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleSeachUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }

    useEffect(() => {
        let isMounted = true;

        const debouncedQuery = setTimeout(async () => {
            try {
                if (userName.trim()) {
                    const res = await axios.get(`${FastApi}/users/username/${userName}`);
                    const data = res.data;
                    const users = Array.isArray(data) ? data : [data];

                    setUserData(users);

                    const rece = users[0].id
                    const exsitingConvo = await axios.get(`${FastApi}/conversations/${rece}`)


                    const check = exsitingConvo.data.includes((user) => user.user2_id === users[0].id)

                    if (check) {
                        await axios.post(`${FastApi}/conversations`, {
                            user1_id: senderId,
                            user2_id: rece
                        })
                    }
                } else {
                    if (isMounted) setUserData([]);
                }
            } catch (err) {
                console.error("Search error:", err);
            }
        }, 500);

        return () => {
             isMounted = false;
            clearTimeout(debouncedQuery);
        };
    }, [userName]);



    return (
        <div className='bg-[#001030] w-[25%] '>
            <div className='flex justify-between items-center p-5'>
                <div className='flex items-center' >
                    <img src="/images/logochat.png" className='w-15' alt="app-logo" />
                    <span className={`text-white text-xl ml-10 ${poppins.className}`}>{senderUsername}</span>
                </div>
                <div>
                    <Ellipsis className='text-white relative cursor-pointer' onClick={handleMenu} />
                </div>
                {/* drop down menu */}
                <div className={`bg-white absolute ${poppins.className} rounded-md top-[12%] left-[110px] px-3 py-4 ${isVisible ? "flex-col" : "hidden"} `}>
                    <p className='cursor-pointer hover:text-blue-600'>edit profile</p>
                    <p className='cursor-pointer hover:text-blue-600'
                        onClick={handleOpenModal}> create a group</p>
                    <p className='cursor-pointer hover:text-blue-600' onClick={() => router.push('/login')}>log out</p>
                </div>
            </div>
            {/* search chats */}
            <div className='bg-[#002670] flex p-2 mx-5 '>
                <Search className='mr-2 text-white' />
                <input type="text" placeholder='search for chats'
                    value={userName}
                    onChange={(event) => handleSeachUser(event)}
                    className='bg-transparent outline-none text-white text-sm w-full' />
            </div>
            {/* user list */}
            <div className='mt-10 flex flex-col gap-y-5 '>
                <ChatUserList setReceiver={setReceiver} UserData={UserData} />
            </div>



        </div>
    )
}

export default ChatLists