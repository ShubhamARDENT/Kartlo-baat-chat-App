import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Poppins } from "next/font/google";
import { Send } from 'lucide-react';
import { IMessages } from './MainChat';
import { retry } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';
import { stat } from 'fs';

const poppins = Poppins({
    subsets: ["latin"],
    weight: "400",
});



const UserMessages = ({ conversationId, receiver, messages, senderId }:
    {
        conversationId: { id: number, user2_id: number }[],
        receiver: number
        senderId: number
    }) => {

    const messageEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    }, [messages]);

    const apicall = async (convoId: number) => {
        // * chat type = conversations
        const res = await axios.get(`http://127.0.0.1:8000/messages/conversation/${convoId}`).then((res) => res.data)

    }

    const mess = useSelector((state) => state.user.userMsg)

    useEffect(() => {
        const convoId = conversationId.find((data) => {
            return data?.user2_id === receiver
        })?.id


        if (convoId) {
            apicall(convoId)
        }

    }, [receiver])
    const usermessages = useSelector((state: any) => state.user.userMsg);

    console.log(usermessages, "usermess")
    return (
        <>
            {
                mess.map((msg, index) => (
                    <div
                        ref={index === messages.length - 1 ? messageEndRef : null}
                        key={msg.id}
                        className={`flex ${msg.sender_id === senderId ? "justify-end" : "justify-start"} mr-4`}
                    >
                        <span
                            className={`m-2 px-3 py-2 rounded-xl mb-3 ${msg.sender_id === senderId
                                ? "bg-[#317bfe] text-white"
                                : "bg-white text-black"
                                } ${poppins.className}`}
                        >
                            <div className="text-sm font-semibold">{msg.sender_username}</div>
                            <div>{msg.content}</div>
                            <div className="text-xs text-gray-500 mt-1">
                                {msg.timestamp}
                            </div>
                        </span>
                    </div>
                ))
            }

        </>

    )
}

export default UserMessages