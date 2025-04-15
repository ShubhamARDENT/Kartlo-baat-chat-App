"use client";
import React, { useEffect, useRef, useState } from "react";
import { Info, Send } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: "400",
});

interface IMessages {
    myText?: string;
    others?: string;
}

interface Props {
    userName: string;
    room?: string; // for public room
    receiver?: string; // for private chat
    mode?: "room" | "private";
}

const MainChat = ({ userName, receiver, }: Props) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<IMessages[]>([]);
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws/private/${userName}/${receiver}`);

        socket.onopen = () => {
            console.log("Connected to private chat");
        };

        socket.onmessage = (event) => {
            setMessages((prev) => [...prev, { others: event.data }]);
        };


        socket.onerror = (err) => {
            console.error("WebSocket error:", err);
        };
        socket.onclose = (event) => {
            console.warn("WebSocket closed", {
                code: event.code,
                reason: event.reason,
                wasClean: event.wasClean,
            });
        };
        socket.onerror = (event) => {
            console.error("WebSocket error:", event);
            console.log("WebSocket readyState:", socket.readyState);
            console.log("WebSocket URL:", socket.url);
        };
        socketRef.current = socket;

        return () => {
            socket.close();
        };
    }, [receiver]);

    const sendMessage = () => {
        if (input.trim() === "") return;
        const socket = socketRef.current;
        if (socket?.readyState === WebSocket.OPEN) {
            socket.send(input);
        }

        setMessages((prev) => [...prev, { myText: input }]);
        setInput("");
    };

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    }, [messages]);

    return (
        <div className="bg-gray-200 h-[100vh] w-full relative flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-2 border-b border-gray-400">
                <div className="flex items-center gap-5">
                    <img src="/images/profile.png" alt="profile" className="w-12" />
                    <span className={`text-xl ${poppins.className}`}>{receiver}</span>
                    <span className="h-4 w-4 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <Info className="cursor-pointer" />
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-2 px-4 py-2 custom-scroll flex-col">
                {messages.map((msg, index) => (
                    <div
                        ref={index === messages.length - 1 ? messageEndRef : null}
                        key={index}
                        className={`flex ${msg.others ? "justify-start" : "justify-end"} mr-4`}
                    >
                        <span
                            className={`m-2 px-3 py-2 rounded-xl ${msg.others
                                ? "bg-white text-black"
                                : "bg-[#317bfe] text-white"
                                } ${poppins.className}`}
                        >
                            {msg.others || msg.myText}
                        </span>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="flex items-center w-full py-3 px-2 bg-white absolute bottom-0">
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
    );
};

export default MainChat;
