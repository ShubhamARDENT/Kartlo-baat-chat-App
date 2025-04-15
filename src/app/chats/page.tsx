"use client"
import React, { useState } from "react";
import ChatLists from "../components/ChatLists";
import MainChat from "../components/MainChat";
import Modal from "../components/Modal";
import ChatUserList from "../components/ChatUserList";
import Doodles from "../components/Doodles";

export default function Chats() {

    // const [userName, setUserName] = useState("")
    const [receiver, setReceiver] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <>

            <div className="flex h-[100vh]">
                <ChatLists
                    setReceiver={setReceiver}
                    setIsModalOpen={setIsModalOpen} />
                {
                    receiver ?
                        <MainChat
                            userName="shubham"
                            receiver={receiver} />
                        :
                        <Doodles />
                }
            </div>
            <Modal isOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}>
                {/* indivdual user chats */}
                <ChatUserList
                    isModalOpen={isModalOpen}
                    setReceiver={setReceiver}
                />
            </Modal >
        </>

    )
}