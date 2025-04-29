//
"use client";
import { setUserConversation, setUserMessage } from "@/store/slices";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "@/store/store";
import { IReceiver } from "../chats/page";
import { group } from "console";
import GroupChat from "./GroupChat";
import { IGroupChat } from "./GroupChat";



interface IUser {
  id: number;
  username: string;
  password?: string;
  email?: string;
}

const ChatUserList = ({
  isModalOpen,
  setReceiver,
  UserData,
  Group,
  setGroupMembers,
  setGroup,
  isActive,
  setIsActive
}: {
  isModalOpen?: boolean;
  UserData?: IUser[];
  Group: IGroupChat[];
  setGroup: React.Dispatch<React.SetStateAction<IGroupChat | undefined>>
  setGroupMembers: React.Dispatch<React.SetStateAction<IUser[]>>;
  setReceiver?: React.Dispatch<React.SetStateAction<IReceiver | undefined>>;
}) => {
  const Fast_API = process.env.NEXT_PUBLIC_Fast_API;
  const dispatch = useDispatch();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const senderID = useTypedSelector((state) => state.user.senderId);
  const [users, setUsers] = useState<IUser[]>([]);
  const [convoList, setConvoList] = useState<any[]>([]);


  useEffect(() => {
    if (!senderID) return
    const fetchData = async () => {
      try {
        const [convoRes, UserRes, myGroupRes] = await Promise.all([
          axios.get(`${Fast_API}/conversations/${senderID}`),
          axios.get(`${Fast_API}/users`),
          axios.get(`${Fast_API}/groups/my-groups/${senderID}`)
        ])
        // Fetch existing conversations
        setConvoList(convoRes.data)
        // Fetch users
        setUsers(UserRes.data)
        // get groups user is part of
        setGroup(myGroupRes.data)
      } catch (error) {
        console.log(error, "error getting data")
      }
    }

    fetchData()
  }, [senderID]);

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

  const grpsetter = () => {
    setIsActive('groups')
    console.log('called')
    console.log("isActive", isActive)
  }

  const Grp = (userInfo: IUser) => {
    setGroupMembers((prev: IUser[]) => {
      const filterMembers = prev.some((user) => user.id === userInfo.id);
      if (filterMembers) return prev;
      return [...prev, userInfo];
    });
  };
  // Choose which list to show: search result or convo list
  const renderList = (UserData ?? []).length > 0 ? UserData : convoList;


  return (
    <div className="flex flex-col justify-between h-full">
      {/* friends and grp */}
      <div className="flex flex-col">
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
                className={`flex items-center ${isModalOpen ? "gap-x-2" : "gap-x-4"
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
                <div className="">
                  <span className="text-lg text-white">
                    {userInfo?.username || "Unknown"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>


    </div >
  );
};

export default ChatUserList;
