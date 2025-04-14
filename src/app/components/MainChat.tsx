"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Info, Send } from 'lucide-react'
import { Poppins } from 'next/font/google'


const poppins = Poppins({
    subsets: ['latin'],
    weight: "400",
})


interface IMessages {
    myText?: string,
    // * include others also 
    others?: string
}

const MainChat = ({ userName }: { userName: string }) => {

    const [input, setInput] = useState("")
    const [messages, setMessages] = useState<IMessages[]>([])



    const messageEndRef = useRef<HTMLDivElement | null>(null)


    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }, [messages])

    const sendMessage = () => {
        // for emply msg
        if (input.trim() === "") return
        setMessages((prev) => [...prev, { myText: input }])
        setInput("")
    }

    const RecievedMessage = (text: string) => {
        setMessages((prev) => [...prev, { others: text }])
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            RecievedMessage("hello from other side")
        }, 1000)

        return () => clearTimeout(timer)
    },[input])

    return (
        <div className='bg-gray-200 h-[100vh] w-full relative flex flex-col'>
            {/* chat header */}
            <div className='flex items-center justify-between  px-5 py-2 border-b-1 border-gray-400 border-solid'>
                <div className='flex items-center gap-5'>
                    <img src="/images/profile.png" alt="profile-photo" className='w-12' />
                    <span className={`text-xl ${poppins.className}`}>{userName || "Richard Stanford"}</span>
                    <span className=" h-4 w-4 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <div>
                    <Info className='cursor-pointer' />
                </div>
            </div>
            {/* chat messages */}
            <div className='flex-1 overflow-y-auto space-y-2 px-4 py-2 custom-scroll flex-col '>
                {messages.map((Message, index) => (
                    <div ref={messageEndRef}
                        key={index}
                        className={`flex py-20 ${Message.others ? "justify-start" : "justify-end"} mr-4 `}>
                        {Message.others ?
                            // * sender
                            (<span className={`m-5 px-2 py-3 bg-white text-black ${poppins.className}`}>
                                {Message.others}
                            </span>)
                            :
                            // * me
                            (<span className={`m-5 px-2 py-3 bg-[#317bfe] text-black ${poppins.className}`}>
                                {Message.myText}
                            </span>)
                        }
                    </div>
                ))}
            </div>
            {/* input msg */}
            <div className="flex items-center w-[100%] py-3 px-2 bg-white absolute bottom-0">
                <input
                    value={input}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    className={`flex-1 px-4 py-2 outline-none ${poppins.className}`}
                    placeholder="Send a Message"
                />
                <button className='p-2 bg-[#317bfe] rounded-full ' onClick={sendMessage}>
                    <Send className="cursor-pointer " color='white' size={20} />
                </button>

            </div>
        </div>
    )
}

export default MainChat 