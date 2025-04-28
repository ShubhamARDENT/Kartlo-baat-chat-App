"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const RoomChat = ({ Group }) => {
  console.log(Group, "in room chat");

  return (
    <div>
      <div>
        <span className="bg-red-300">{Group.group_name}</span>
      </div>
    </div>
  );
};

export default RoomChat;
