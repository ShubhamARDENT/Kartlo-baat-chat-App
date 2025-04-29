"use client";
import React, { useEffect, useRef, useState } from "react";
import { Info, Send } from "lucide-react";
import { Poppins } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import UserMessages from "./UserMessages";
import axios from "axios";
import { IReceiver } from "../chats/page";
import { IGroupChat } from "./GroupChat";

const poppins = Poppins({
    subsets: ["latin"],
    weight: "400",
});

export interface IMessages {
    message: string,
    mode: string,
    receiver: number,
    sender: number
}[]


const MainChat = ({ receiver, Group, isActive }: { receiver?: IReceiver, Group?: IGroupChat }) => {
    const [input, setInput] = useState("");
    const socketRef = useRef<WebSocket | null>(null);

    const [messages, setMessages] = useState<IMessages[]>([]);

    const receiverid = receiver?.id

    const senderid = useSelector((state) => state.user.senderId)

    useEffect(() => {
        // Only proceed if we have the necessary IDs
        if (!senderid || (!receiverid)) {
            console.log("Missing required IDs for WebSocket connection");
            return;
        }

        // Determine the WebSocket URL
        // const socketURL = groupChat
        //     ? `ws://localhost:8000/ws/group/${groupChat}`
        //     : `ws://localhost:8000/ws/private/${senderid}/${receiverid}`;
        const socketURL = `ws://localhost:8000/ws/private/${senderid}/${receiverid}`;

        // Create the WebSocket connection
        try {
            const socket = new WebSocket(socketURL);
            socketRef.current = socket;

            // Connection opened
            socket.onopen = function (event) {
                console.log("WebSocket connection established successfully");
            };

            // Listen for messages
            socket.onmessage = function (event) {
                try {
                    console.log("Message received:", event.data);
                    const message = JSON.parse(event.data);
                    console.log(message, "mess")
                    setMessages(prev => [...prev, message]);
                } catch (e) {
                    console.error("Error parsing message:", e);
                }
            };

            // Connection closed
            socket.onclose = function (event) {
                const reason = event.reason ? ` Reason: ${event.reason}` : '';
                console.log(`WebSocket closed with code: ${event.code}.${reason}`);
            };

            // Connection error - capture more detailed error info
            socket.onerror = function (event) {
                console.log("WebSocket error event:", JSON.stringify(event, Object.getOwnPropertyNames(event)));
                console.log("WebSocket readyState:", socket.readyState);

                // Check if there are network issues
                if (!navigator.onLine) {
                    console.error("Network appears to be offline");
                }
            };

            // Cleanup function
            return () => {
                if (socket && socket.readyState < 2) { // 0=CONNECTING, 1=OPEN
                    socket.close();
                }
            };
        } catch (err) {
            console.error("Error creating WebSocket:", err);
        }
    }, [senderid, receiverid]);

    const sendMessage = () => {
        if (socketRef.current && input) {
            socketRef.current.send(input);
            setInput('');
        }
    };

    const grpname = useSelector((state) => state.user.GroupName)



    if (receiver && isActive === "friends") {
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
                    <UserMessages messages={messages || []} selectedUserId={receiverid} />
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
    }

    if (Group && isActive === "groups") {
        return (
            <div className="bg-gray-200 h-screen w-full relative flex flex-col overflow-auto hide-scrollbar">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-2 border-b border-gray-400">
                    <div className="flex items-center gap-5">
                        <img src="/images/profile.png" alt="profile" className="w-12" />
                        <span className={`text-xl ${poppins.className}`}>{grpname}</span>
                        <span className="h-4 w-4 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <Info className="cursor-pointer" />
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 px-4 py-3 custom-scroll flex-col mb-15">
                    {/* Chat Messages */}
                    <UserMessages messages={messages || []} selectedUserId={receiverid} />
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
        )






    }

};

export default MainChat;
