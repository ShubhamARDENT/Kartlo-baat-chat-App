"use client"
import React, { useState } from "react";
import ChatLists from "../components/ChatLists";
import MainChat from "../components/MainChat";
import Modal from "../components/Modal";
import ChatUserList from "../components/ChatUserList";

export default function chats() {

    const [userName, setUserName] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([])

    return (
        <>
            <div className="flex h-full">
                <ChatLists
                    setUserName={setUserName}
                    selectedUsers={selectedUsers}
                    setIsModalOpen={setIsModalOpen} />
                <MainChat userName={userName} />
            </div>
            <Modal isOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}>
                <ChatUserList
                    isModalOpen={isModalOpen}
                    setUserName={setUserName}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers} />
            </Modal >
        </>

    )
}