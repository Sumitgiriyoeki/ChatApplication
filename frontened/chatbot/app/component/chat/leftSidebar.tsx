"use client";

type Props = {
  username: string;
  inputName: string;
  setInputName: (val: string) => void;
  handleLogin: (e: React.FormEvent) => void;
  logout: () => void;
  users: string[];
  selectedUser: string | null;
  setSelectedUser: (user: string) => void;
  unreadCounts: Record<string, number>;
  setUnreadCounts: React.Dispatch<React.SetStateAction<Record<string, number>>>;
};

export default function LeftSidebar({
  username,
  inputName,
  setInputName,
  handleLogin,
  logout,
  users,
  selectedUser,
  setSelectedUser,
  unreadCounts,
  setUnreadCounts
}: Props) {
  return (
    <div className="w-[30%] h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-lg">
      {!username ? (
        <div className="p-6 flex-1 flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Welcome 👋
          </h2>

          <form onSubmit={handleLogin} className="space-y-3">
            <input
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg text-black outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded-lg font-medium">
              Start Chat
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 p-4 border-b border-slate-700">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-lg">
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold">{username}</p>
              <p className="text-xs text-green-400">Online</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            <h4 className="text-sm text-gray-400 px-2 mb-2">Chats</h4>

            {users.map((user) => {
              const isActive = selectedUser === user;
              return (
                <div key={user}
                  onClick={() => {
                    setSelectedUser(user);
                    setUnreadCounts(prev => ({
                      ...prev,
                      [user]: 0
                    }));
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all mb-1
                  ${isActive? "bg-blue-600 shadow-md": "hover:bg-slate-700"}`} >
                  <div className="w-9 h-9 rounded-full bg-gray-500 flex items-center justify-center font-semibold">
                    {user.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">{user}</p>
                    <p className="text-xs text-gray-400 truncate">
                      Click to start chat
                    </p>
                    
                  </div>
                  {unreadCounts[user] > 0 && (
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCounts[user]}
                    </div>
                  )}
                  {isActive && <div className="w-2 h-2 bg-green-400 rounded-full"></div>}
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t border-slate-700">
            <button onClick={logout}
              className="w-full bg-red-600 hover:bg-red-700 p-3 rounded-lg font-medium transition"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}