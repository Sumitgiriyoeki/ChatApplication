"use client";

import { Message } from "../types/message.type";

type Props = {
  selectedUser: string | null;
  messages: Record<string, Message[]>;
  message: string;
  setMessage: (val: string) => void;
  sendMessage: (e: React.FormEvent) => void;
  typingUsers: Record<string, boolean>;
  handleTyping: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
};

export default function RightPanel({
  selectedUser,
  messages,
  message,
  setMessage,
  sendMessage,
  typingUsers,
  handleTyping,
}: Props) {
  if (!selectedUser) {
    return (
      <div className="w-[70%] p-3 flex items-center justify-center bg-slate-100">
        <h3 className="text-gray-500 text-lg">Select a user to start chat</h3>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-slate-100">
      <div className="bg-white border-b border-gray-300 p-4 flex items-center shadow-sm">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white mr-3">
          {selectedUser.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{selectedUser}</p>
          <p className="text-xs text-green-500">Online</p>
        </div> 
          {/*------- Typing Indicator -----------*/}
        {typingUsers[selectedUser] && (
          <div className="flex justify-start items-center space-x-2">
            <span className="text-gray-500 text-sm italic">{selectedUser} is typing...</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {(messages[selectedUser] || []).map((m, i) => {
          const isMe = m.user === "Me";
          return (
            <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg shadow-sm 
                  ${isMe ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-gray-900 rounded-bl-none"}
                `}
              >
                <p className="text-sm">{m.msg}</p>
                <span className={`text-xs mt-1 block text-right ${isMe ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-gray-900 rounded-br-none"}`}>
                  {m.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={sendMessage}
        className="bg-white border-t border-gray-300 p-3 flex items-center gap-2 shadow-inner"
      >
        <input
          type="text"
          value={message}
          onChange={handleTyping}
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}