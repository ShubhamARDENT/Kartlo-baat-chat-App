"use client"
import React, { useState } from 'react'
import { Poppins } from 'next/font/google'
import ChatUserList from './ChatUserList'
import { Search, Ellipsis } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'


const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
    display: 'swap',
})

const ChatLists = ({ setIsModalOpen, setReceiver ,conversationId }: {
    setReceiver: React.Dispatch<React.SetStateAction<number>>
     conversationId:{}
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const router = useRouter()
    const [isVisible, setVisible] = useState(false)
    const handleMenu = () => {
        setVisible(prev => !prev)
    }


    const handleOpenModal = () => {
        setIsModalOpen(true)
    }


    return (
        <div className='bg-[#001030] w-[25%] '>
            <div className='flex justify-between items-center p-5'>
                <div className='flex items-center' >
                    <img src="/images/logochat.png" className='w-15' alt="app-logo" />
                    <span className={`text-white text-xl ml-10 ${poppins.className}`}>LoggedInUser</span>
                </div>
                <div>
                    <Ellipsis className='text-white relative cursor-pointer' onClick={handleMenu} />
                </div>
                {/* drop down menu */}
                <div className={`bg-white absolute ${poppins.className} rounded-md top-[8%] left-[220px] px-3 py-4 ${isVisible ? "flex-col" : "hidden"} `}>
                    <p className='cursor-pointer hover:text-blue-600'>edit profile</p>
                    <p className='cursor-pointer hover:text-blue-600'
                        onClick={handleOpenModal}> create a group</p>
                    <p className='cursor-pointer hover:text-blue-600' onClick={() => router.push('/login')}>log out</p>
                </div>
            </div>
            {/* serach chats */}
            <div className='bg-[#002670] flex p-2 mx-5 '>
                <Search className='mr-2 text-white' />
                <input type="text" placeholder='search for chats'
                    className='bg-transparent outline-none text-white text-sm w-full' />
            </div>
            {/* user list */}
            <div className='mt-10 flex flex-col gap-y-5 '>
                <ChatUserList setReceiver={setReceiver} conversationId={conversationId} />
            </div>



        </div>
    )
}

export default ChatLists