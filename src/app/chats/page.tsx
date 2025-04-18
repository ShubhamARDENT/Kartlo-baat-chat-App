"use client"
import React, { useEffect, useState } from "react";
import ChatLists from "../components/ChatLists";
import MainChat from "../components/MainChat";
import Modal from "../components/Modal";
import ChatUserList from "../components/ChatUserList";
import Doodles from "../components/Doodles";
import axios from "axios";
import { useSelector } from "react-redux";


export default function Chats() {

    // const [userName, setUserName] = useState([])
    const [receiver, setReceiver] = useState<number>(0)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [conversationId, setConversationId] = useState({})

    const senderId = useSelector((state) => state?.user?.senderId);

    // * get relation of loggedin user with other user
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/conversations/${senderId}`).then((res) => setConversationId(res.data))
    }, [])
 
    return (
        <>
            <div className="flex h-[100vh]">
                <ChatLists
                    receiver={receiver}
                    setReceiver={setReceiver}
                    setIsModalOpen={setIsModalOpen}
                    conversationId={conversationId} />
                {
                    receiver ?
                        <MainChat
                            receiver={receiver}
                            conversationId={conversationId} />
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