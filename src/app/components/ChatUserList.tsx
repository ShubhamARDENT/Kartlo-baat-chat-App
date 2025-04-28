//
"use client";
import { setUserConversation, setUserMessage } from "@/store/slices";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "@/store/store";
import { IReceiver } from "../chats/page";
import { userInfo } from "os";
import RoomChat from "../roomchat/roomchat";

interface IUser {
  id: number;
  username: string;
  password: string;
  email: string;
}

const ChatUserList = ({
  isModalOpen,
  groupMembers,
  setReceiver,
  UserData,
  setGroupMembers,
}: {
  isModalOpen?: boolean;
  UserData?: IUser[];
  setGroupMembers: React.Dispatch<React.SetStateAction<IUser[]>>;
  setReceiver?: React.Dispatch<React.SetStateAction<IReceiver | undefined>>;
}) => {
  const Fast_API = process.env.NEXT_PUBLIC_Fast_API;
  const dispatch = useDispatch();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const senderID = useTypedSelector((state) => state.user.senderId);
  const [users, setUsers] = useState<IUser[]>([]);
  const [convoList, setConvoList] = useState<any[]>([]);
  const [Group, setGroup] = useState({});

  console.log(groupMembers, "grpmembers");
  useEffect(() => {
    // Fetch existing conversations
    axios.get(`${Fast_API}/conversations/${senderID}`).then((res) => {
      setConvoList(res.data);
    });

    // Fetch users
    axios.get(`${Fast_API}/users`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  const getConvoId = async (id: number) => {
    if (id) {
      const res = await axios.get(`${Fast_API}/conversations/${id}`);
      const conversation = res.data.find(
        (convo: any) =>
          (convo.user1_id === senderID && convo.user2_id === id) ||
          (convo.user2_id === senderID && convo.user1_id === id)
      );
      dispatch(setUserConversation(conversation));
    }
  };

  const Grp = (userInfo: IUser) => {
    setGroupMembers((prev: IUser[]) => {
      const filterMembers = prev.some((user) => user.id === userInfo.id);
      if (filterMembers) return prev;
      return [...prev, userInfo];
    });
  };
  // Choose which list to show: search result or convo list
  const renderList = (UserData ?? []).length > 0 ? UserData : convoList;

  useEffect(() => {
    if (groupMembers?.length > 0) {
      // Iterate through group members and fetch their details
      const groupMemberIds = groupMembers.map(
        (member: { id: number }) => member.id
      );

      // Fetch group data including members' info
      axios.get(`${Fast_API}/groups/${groupMemberIds}`).then((res) => {
        setGroup(res.data);
      });
    }
  }, [groupMembers]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="overflow-y-auto">
        {renderList?.map((user: any) => {
          const userId =
            user.user1_id && user.user2_id
              ? user.user1_id === senderID
                ? user.user2_id
                : user.user1_id
              : user.id;

          const userInfo = users.find((u) => u.id === userId);

          return (
            <div
              key={user.id}
              className={`flex items-center ${
                isModalOpen ? "gap-x-2" : "gap-x-4"
              }  
                            cursor-pointer hover:bg-[#002670] px-2 py-2`}
              onClick={() => {
                if (!isModalOpen) {
                  setReceiver && setReceiver(userInfo);
                  userInfo && Grp(userInfo);
                  getConvoId(user.user2_id);
                }
              }}
            >
              {isModalOpen && (
                <input type="checkbox" className="scale-150 cursor-pointer" />
              )}
              <img
                src="/images/profile.png"
                alt="user-profile"
                className="w-10 mx-2"
              />
              <div className="flex flex-col">
                <span className="text-lg text-white">
                  {userInfo?.username || "Unknown"}
                </span>
              </div>
            </div>
          );
        })}
        {Group && <RoomChat Group={Group} />}
      </div>
    </div>
  );
};

export default ChatUserList;
