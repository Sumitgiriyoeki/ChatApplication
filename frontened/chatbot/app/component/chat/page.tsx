"use client";

import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { Message } from "../types/message.type";
import EntryLevel from "../entryLevel";
import LeftSidebar from "./leftSidebar";
import RightPanel from "./RightPanel";

export default function Page() {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [username, setUsername] = useState("");
  const [inputName, setInputName] = useState("");
  const [users] = useState(["Rahul", "Aman", "Priya"]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({});
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem("chatUser");
    if (saved) setUsername(saved);
  }, []);

  useEffect(() => {
    if (!username) return;
    if (connectionRef.current) return;
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5203/chatHub")
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;
    connection.on("ReceiveMessage", (fromUser, msg) => {
      const currentUser = localStorage.getItem("chatUser");
      const parts = msg.split("|");
      if (parts.length < 2) return;
      const toUser = parts[0];
      const actualMsg = parts[1];

      if (toUser === currentUser || fromUser !== currentUser) {
        const chatUser = fromUser === currentUser ? toUser : fromUser;
        if (actualMsg === "__typing__") {
          const chatUser = fromUser === currentUser ? toUser : fromUser;
          setTypingUsers(prev => ({ ...prev, [chatUser]: true }));
          setTimeout(() => {
            setTypingUsers(prev => ({ ...prev, [chatUser]: false }));
          }, 2000);

          return; 
        }

        setMessages((prev) => ({...prev,[chatUser]: [
            ...(prev[chatUser] || []),
            {
              user: fromUser === currentUser ? "Me" : fromUser,
              msg: actualMsg,
              time: new Date().toLocaleTimeString(),
            },
          ],
        }));
        if(chatUser !== selectedUser){
          setUnreadCounts(prev=>({
            ...prev,[chatUser]:(prev[chatUser] || 0) + 1
          }))
        }
      }
    });

    connection.start().catch(console.error);
      return () => {
        connection.stop();
        connectionRef.current = null;
      };
    }, [username]);

  const handleLogin = (e:any) => {
    e.preventDefault();
    if (!inputName) return;
    localStorage.setItem("chatUser", inputName);
    setUsername(inputName);
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    const connection = connectionRef.current;
    if (connection && selectedUser) {
      connection.invoke("SendMessage", username, selectedUser + "|__typing__").catch(console.error);
    }
  };

  const logout = () => {
    localStorage.removeItem("chatUser");
    setUsername("");
  };

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!selectedUser) {
      alert("Select user first");
      return;
    }

    const connection = connectionRef.current;
    if (!connection || connection.state !== signalR.HubConnectionState.Connected) {
      alert("Not connected");
      return;
    }

    if (!message) return;

    try {
      setMessages((prev) => ({...prev, [selectedUser]: [
          ...(prev[selectedUser] || []),
          {
            user: "Me",
            msg: message,
            time: new Date().toLocaleTimeString(),
          },
        ],
      }));
      await connection.invoke("SendMessage", username, selectedUser + "|" + message);
      setMessage("");
    } catch (err) {
      console.error("Send error:", err);
    }
  };

    //---- loginbar -------------------
    if (!username) {
      return (
        <EntryLevel
          inputName={inputName}
          setInputName={setInputName}
          handleLogin={handleLogin}
        />
      );
    }

  // -------- CHAT -------
  return (
    <div className="flex h-screen">
      {/*------ LEFT PANEL ----------*/}
      <LeftSidebar
          username={username}
          inputName={inputName}
          setInputName={setInputName}
          handleLogin={handleLogin}
          logout={logout}
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          unreadCounts={unreadCounts}
          setUnreadCounts={setUnreadCounts} 
        />

      {/*-------- RIGHT PANEL ----------*/}
      <div className="w-[70%] p-3">
        <RightPanel
          selectedUser={selectedUser}
          messages={messages}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          typingUsers={typingUsers}        
          handleTyping={handleTyping}
        />
      </div>
    </div>
  );
}