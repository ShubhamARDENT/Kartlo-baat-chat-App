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
    // length: number
}[]


interface Props {
    receiver?: number; // for private chat 
    conversationId: { id: number }[]
}

const MainChat = ({ receiver, conversationId }: Props) => {

    const socketRef = useRef<WebSocket | null>(null);
    const [LoggedInUser, setLoggedInUser] = useState<number>(0);
    //* create unique name
    const Name = `${Math.max(receiver, LoggedInUser)}_${Date.now()})}`
    const senderId = useSelector((state) => state?.user?.senderId);
    const [input, setInput] = useState("");
    const convoId = conversationId[0]?.id
    const dispatch = useDispatch()
    const [messages, setMessages] = useState<IMessages[]>([{
        content: "",
        sender_id: 0,
        conversation_id: 0,
        groupchat_id: 0
    }])



    //* receverd comes from listing
    useEffect(() => {
        setLoggedInUser(senderId)
    }, [])

    const sendMessage = async () => {

        if (!input.trim()) return;

        const newMessage = {
            content: input,
            sender_id: senderId,
            conversation_id: convoId,
            groupchat_id: null,
        }

        setMessages((prev) => [...prev, newMessage])

        //* sending convo
        if (!convoId && senderId && receiver) {
            try {
                const res = await axios.post("http://127.0.0.1:8000/conversations", {
                    name: Name,
                    user1_id: senderId,
                    user2_id: receiver,
                });

                console.log("Conversation created:", res.data);
            } catch (error) {
                console.error("Error creating conversation:", error);
            }
        }

        //* sending msg to backend
        try {
            const ss = await axios.post("http://127.0.0.1:8000/messages", newMessage)
            if (ss.statusText === "OK") {
                const messages = await axios.get(`http://127.0.0.1:8000/messages/conversation/${convoId}`)
                console.log(messages, "yy")
                dispatch(setUserMessage(messages.data))
            }
        } catch (error) {
            console.error("Error sending conversation:", error);
        }

        setInput("")
    };



    return (
        <div className="bg-gray-200 h-screen w-full relative flex flex-col overflow-auto hide-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-2 border-b border-gray-400">
                <div className="flex items-center gap-5">
                    <img src="/images/profile.png" alt="profile" className="w-12" />
                    <span className={`text-xl ${poppins.className}`}>{receiver}</span>
                    <span className="h-4 w-4 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <Info className="cursor-pointer" />
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 px-4 py-2 custom-scroll flex-col mb-12">
                {/* Chat Messages */}
                <UserMessages
                    senderId={senderId}
                    messages={messages}
                    receiver={receiver}
                    conversationId={conversationId}
                />
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
