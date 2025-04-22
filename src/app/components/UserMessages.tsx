import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Poppins } from "next/font/google";
import { Send, Users } from 'lucide-react';
import { IMessages } from './MainChat';
import { retry } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';
import { stat } from 'fs';

const poppins = Poppins({
    subsets: ["latin"],
    weight: "400",
});



const UserMessages = ({ messages }:
    {
        receiver: number
    }) => {

    const { userMsg, senderId } = useSelector((state) => state.user)

    const messageEndRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
      
        messageEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    }, [userMsg]);



    return (
        <>
            {
                userMsg?.map((msg, index) => {

                    const date = new Date(msg.timestamp)
                    const options: Intl.DateTimeFormatOptions = {
                        hour: "2-digit",
                        minute: "2-digit",
                    };
                    const timeString = date.toLocaleTimeString([], options);


                    return (
                        <div
                            ref={index === userMsg.length - 1 ? messageEndRef : null}
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
                                <div className="text-xs text-white mt-1">
                                    {timeString}
                                </div>
                            </span>
                        </div>
                    )
                }


                )
            }

        </>

    )
}

export default UserMessages