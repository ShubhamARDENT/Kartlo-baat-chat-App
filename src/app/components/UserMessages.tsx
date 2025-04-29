
import React, { useEffect, useRef } from 'react'
import { Poppins } from "next/font/google";
import { useSelector } from 'react-redux';
import { IMessages } from './MainChat';



const poppins = Poppins({
    subsets: ["latin"],
    weight: "400",
});




const UserMessages = ({ messages, selectedUserId }:
    {
        selectedUserId: number,
        messages: IMessages[]
    }) => {

    const { senderId } = useSelector((state) => state.user)


    const messageEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    }, [messages]);

    const filteredMessages = messages.filter(
        (msg) =>
            (String(msg.sender) === String(senderId) &&
                String(msg.receiver) === String(selectedUserId)) ||
            (String(msg.sender) === String(selectedUserId) &&
                String(msg.receiver) === String(senderId))
    );


    return (
        <>
            {
                filteredMessages?.map((msg, index) => {
                    return (
                        <div
                            ref={index === messages.length - 1 ? messageEndRef : null}
                            key={index}
                            className={`flex ${msg.sender === senderId ? "justify-end" : "justify-start"} mr-4`}
                        >
                            <span
                                className={`m-2 px-3 py-2 rounded-xl mb-3 ${msg.sender === senderId ? "bg-blue-500 text-white" :
                                    "bg-white text-black"}
                                     ${poppins.className}`}
                            >

                                <div>{msg.message}</div>

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