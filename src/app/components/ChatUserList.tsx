"use client"
import React, { useState } from 'react'

interface IUser {
    name: string;
    userId: number;
    status: string;
}

const ChatUserList = ({ setUserName, isModalOpen, setSelectedUsers, selectedUsers }: {
    setUserName: React.Dispatch<React.SetStateAction<string>>
    selectedUser: number[]
    setSelectedUsers: React.Dispatch<React.SetStateAction<number[]>>
    isModalOpen: boolean
}) => {

    const dummyUsers: IUser[] = [
        { name: "user1", userId: 1, status: "Hey There !" },
        { name: "user12", userId: 21, status: "Hey There !" },
        { name: "user2", userId: 2, status: "Hey There !" },
        { name: "user3", userId: 3, status: "Hey There !" },
        { name: "user4", userId: 4, status: "Hey There !" }
    ]

    const [dummyUserData, setDummyUserData] = useState<IUser[]>(dummyUsers)

    const [groupName, setGroupName] = useState<string>("hello")

    const handleCheckboxChange = (userId: number) => {

        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        )
    }

    const handleCreateGroup = () => {
        const selected = dummyUserData.filter(user => selectedUsers.includes(user.userId))
       
    }

    return (
        <div className='flex flex-col justify-between h-full'>
            <div className='overflow-y-auto'>
                {dummyUserData.map((user) => (
                    <div key={user.userId}
                        className={`flex items-center ${isModalOpen ? "gap-x-2" : "gap-x-4"}
                            cursor-pointer hover:bg-[#002670] px-2 py-2`}
                        onClick={() => {
                            if (!isModalOpen) {
                                setUserName(user.name)
                            }
                        }}>
                        {isModalOpen && (
                            <input
                                type="checkbox"
                                className="scale-150 cursor-pointer"
                                checked={selectedUsers.includes(user.userId)}
                                onChange={() => handleCheckboxChange(user.userId)}
                                onClick={(e) => e.stopPropagation()} // prevent parent click
                            />
                        )}

                        <img src="/images/profile.png"
                            alt="user-profile"
                            className='w-10 mx-2' />
                        <div className='flex flex-col'>
                            <span className='text-lg text-white'>{user.name}</span>
                            <span className='text-white text-sm'>{user.status}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Group Button */}
            {isModalOpen && (
                <button
                    className='bg-blue-600 text-white p-3 m-4 rounded-lg hover:bg-blue-700 cursor-pointer'
                    onClick={handleCreateGroup}
                    disabled={selectedUsers.length < 2}
                >
                    Create Group
                </button>
            )}
        </div>
    )
}

export default ChatUserList
