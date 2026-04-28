"use client";

type Props = {
  inputName: string;
  setInputName: (value: string) => void;
  handleLogin: (e: React.FormEvent) => void;
};

export default function EntryLevel({ inputName, setInputName, handleLogin }: Props) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Welcome to ChatZone 🤖
        </h2>

        <p className="text-gray-500 dark:text-gray-300 text-center mb-8">
          Enter your name to start chatting with friends.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Enter Your name"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Start Chat
          </button>
        </form>

      </div>
    </div>
  );
}