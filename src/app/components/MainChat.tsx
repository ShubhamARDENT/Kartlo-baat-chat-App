"use client";
import React, { useEffect, useRef, useState } from "react";
import { Info, Send } from "lucide-react";
import { Poppins } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import UserMessages from "./UserMessages";
import axios from "axios";
import { setUserMessage } from "@/store/slices";

const poppins = Poppins({
    subsets: ["latin"],
    weight: "400",
});

export interface IMessages {
    content: string,
    sender_id: number,
    conversation_id: number,
    groupchat_id: number | null

}[]


interface Props {
    receiver?: {
        username: string
    }
}

const MainChat = ({ receiver, }: Props) => {
    const [input, setInput] = useState("");

    const socketRef = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const userConversation = useSelector((state) => state.user.userConversation)

    const receiverid = receiver?.id


    const senderid = useSelector((state) => state.user.senderId)

   
    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws/private/${senderid}/${receiverid}`);
        socketRef.current = socket;

        socket.onclose = () => {
            console.log("WebSocket closed");
        };

        socket.onerror = (err) => {
            console.error("WebSocket error:", err);
        };
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prev) => [...prev, message])

        };

        return () => {
            socket.close();
        };
    }, [receiverid]);

    const sendMessage = () => {
        if (socketRef.current && input) {
            socketRef.current.send(input);
            setInput('');
        }
    };
    return (
        <div className="bg-gray-200 h-screen w-full relative flex flex-col overflow-auto hide-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-2 border-b border-gray-400">
                <div className="flex items-center gap-5">
                    <img src="/images/profile.png" alt="profile" className="w-12" />
                    <span className={`text-xl ${poppins.className}`}>{receiver?.username}</span>
                    <span className="h-4 w-4 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <Info className="cursor-pointer" />
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 px-4 py-3 custom-scroll flex-col mb-15">
                {/* Chat Messages */}
                <UserMessages messages={messages} selectedUserId={receiverid} />
                {/* Input */}
                <div className="flex items-center w-full py-3 px-2 bg-white absolute bottom-0 left-0">
                    <input
                        value={input}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        className={`flex-1 px-4 py-2 outline-none ${poppins.className}`}
                        placeholder="Send a Message"
                    />
                    <button
                        className="p-2 bg-[#317bfe] rounded-full"
                        onClick={sendMessage}
                    >
                        <Send className="cursor-pointer" color="white" size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainChat;
