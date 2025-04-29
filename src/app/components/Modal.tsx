"use client";
import React, { useEffect } from "react";
import { Poppins } from "next/font/google";
import { useState } from "react";
import { IReceiver, IUser } from "../chats/page";
import axios from "axios";
import { group } from "console";

interface ModalProps {
  isOpen: boolean;
  groupMembers: IReceiver[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  setGroupMembers: React.Dispatch<React.SetStateAction<IReceiver[]>>;
  setUserData: React.Dispatch<React.SetStateAction<IUser[]>>;
  setGroupName: React.Dispatch<React.SetStateAction<string>>;
  groupName: string;
}
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const Modal = ({
  isOpen,
  setIsModalOpen,
  children,
  groupMembers,
  setGroupMembers,
  setUserData,
  setGroupName,
  groupName,
}: ModalProps) => {
  const Fast_API = process.env.NEXT_PUBLIC_Fast_API;
  const [userName, setUserName] = useState("");

  //* search
  useEffect(() => {
    if (!userName) return;
    const debouncedQuery = setTimeout(async () => {
      const res = await axios.get(`${Fast_API}/users/username/${userName}`);
      const data = res.data;
      const users = Array.isArray(data) ? data : [data];
      setUserData(users);
    }, 1000);

    return () => {
      clearTimeout(debouncedQuery);
    };
  }, [userName]);

  if (!isOpen) return null;

  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).id === "modal-overlay") {
      setIsModalOpen(false);
    }
  };

  const handleCreateGrp = async () => {
    const memberIds = groupMembers.map((member) => member.id);
    try {
      const res = await axios.post(`${Fast_API}/groups/create`, {
        group_name: groupName,
        member_ids: memberIds,
      });

      
    } catch (error) {
      console.log(error, "error creating grp");
    }
  };
  return (
    // modal bg
    <div
      id="modal-overlay"
      className="fixed inset-0 z-1 flex items-center justify-center bg-black/50"
      onClick={(e) => handleCloseModal(e)}
    >
      {/* modal content */}
      <div className="bg-[#001030] w-full rounded-xl shadow-lg p-7 min-w-[300px] max-w-lg relative">
        {/* create group name and + */}
        <div className=" flex flex-col items-center gap-5">
          <span className="text-white text-2xl p-2">create a group</span>
          {/* group name */}
          <input
            type="text"
            value={groupName}
            placeholder="Group name"
            onChange={(e) => setGroupName(e.target.value)}
            className={`bg-white p-4 outline-none text-black text-sm w-[100%] ${poppins.className}`}
          />
          {/* search for members */}
          <input
            type="search"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Search for users"
            className={`bg-white p-4 outline-none text-black text-sm w-[100%] ${poppins.className}`}
          />
          {/* group members name */}
          <div className="flex gap-2">
            {groupMembers &&
              groupMembers.map((user) => (
                <div className=" bg-white p-2" key={user.id}>
                  <span className="text-black">{user.username}</span>
                  <button
                    onClick={() =>
                      setGroupMembers((prev) =>
                        prev.filter((member) => member.id !== user.id)
                      )
                    }
                    className="text-red-500 font-bold ml-1 cursor-pointer"
                  >
                    &times;
                  </button>
                </div>
              ))}
          </div>

          <div className=" w-full">{children}</div>
          <button
            onClick={() => handleCreateGrp()}
            className="text-white  cursor-pointer bg-blue-400 p-3 hover:bg-white hover:text-black"
            type="button"
          >
            create a group
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
