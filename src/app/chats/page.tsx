"use client";
import React, { useEffect, useState } from "react";
import ChatLists from "../components/ChatLists";
import MainChat from "../components/MainChat";
import Modal from "../components/Modal";
import ChatUserList from "../components/ChatUserList";
import Doodles from "../components/Doodles";
import axios from "axios";

import { IGroupChat } from "../components/GroupChat";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

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
  const [Group, setGroup] = useState<IGroupChat>()
  const [isActive, setIsActive] = useState<"friends" | "groups">("friends");

  const userid = useSelector((state) => state)
  const router = useRouter();

  useEffect(() => {
    if (userid.user.senderUsername) {

      router.push('/chats')
    } else {
      router.push('/login')
    }
  }, [userid.user])
  return (
    <>
      <div className="flex h-[100vh]">
        <ChatLists
          setIsActive={setIsActive}
          isActive={isActive}
          Group={Group}
          setGroup={setGroup}
          setReceiver={setReceiver}
          setIsModalOpen={setIsModalOpen}
          setUserData={setUserData}
          setGroupMembers={setGroupMembers}
          UserData={UserData}
        />

        {(receiver || (Group && Group.group_id)) ? (
          <MainChat receiver={receiver} Group={Group} isActive={isActive} />
        ) : (
          <Doodles />
        )}
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
        <ChatUserList
          isActive={isActive}
          setIsActive={setIsActive}
          setGroupMembers={setGroupMembers}
          UserData={UserData}
          groupMembers={groupMembers}
          Group={Group}
          setGroup={setGroup} />
      </Modal>
    </>
  );
}
