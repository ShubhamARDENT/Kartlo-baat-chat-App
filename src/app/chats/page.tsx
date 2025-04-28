"use client";
import React, { useEffect, useState } from "react";
import ChatLists from "../components/ChatLists";
import MainChat from "../components/MainChat";
import Modal from "../components/Modal";
import ChatUserList from "../components/ChatUserList";
import Doodles from "../components/Doodles";
import axios from "axios";
import { useSelector } from "react-redux";
import RoomChat from "../roomchat/roomchat";
import { group } from "console";

export interface IReceiver {
  id: number;
  email?: string;
  username: string;
}

export interface IUser {
  username: string;
  id: number;
}

export default function Chats() {
  const [receiver, setReceiver] = useState<IReceiver>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupMembers, setGroupMembers] = useState<IReceiver[]>([]);
  const [UserData, setUserData] = useState<IUser[]>([]);
  const [groupName, setGroupName] = useState("");


  
  return (
    <>
      <div className="flex h-[100vh]">
        <ChatLists
          setReceiver={setReceiver}
          setIsModalOpen={setIsModalOpen}
          setUserData={setUserData}
          
          UserData={UserData}
        />
        {receiver ? <MainChat receiver={receiver} /> : <Doodles />}
      </div>

      <Modal
        isOpen={isModalOpen}
        groupMembers={groupMembers}
        setGroupMembers={setGroupMembers}
        setUserData={setUserData}
        setIsModalOpen={setIsModalOpen}
        setGroupName={setGroupName}
        groupName={groupName}
      >
        <ChatUserList setGroupMembers={setGroupMembers} UserData={UserData} groupMembers={groupMembers}/>
      </Modal>
    </>
  );
}
