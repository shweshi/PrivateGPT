import { useState, useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import TypingAnimation from "./TypingAnimation";

const inter = Inter({ subsets: ["latin"] });

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);

    sendMessage(inputValue);

    setInputValue("");
  };

  const sendMessage = async (text) => {
    setIsLoading(true);
    console.log("API URL:", process.env);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/query?text=${text}`
    );
    const data = await response.json();
    setChatLog((preChatLog) => [
      ...preChatLog,
      { type: "bot", message: data.message },
    ]);
    setIsLoading(false);
  };

  const chatContainerRef = useRef(null);

  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      console.log('hiii')
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Call scrollToBottom when chatLog updates
  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  return (
    <div className="container mx-auto bg-[#191a23]  flex flex-col" style={{ minHeight: `calc(100vh - ${3}rem)` }}>
      <div className="bg-[#191a23] border-gray-100 dark:border-gray-600 shadow-none sticky top-0">
        <h1 className="text-center py-3 font-bold text-xl text-gray-300">
          Chat with your PDF
        </h1>
      </div>
      <div ref={chatContainerRef} className="flex-grow p-6 overflow-y-auto">
        <div className="flex flex-col space-y-4 lg:w-2/3 mx-auto">
          {chatLog.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  message.type === "user" ? "bg-purple-500" : "bg-gray-800"
                } rounded-lg px-2 py-2 text-white max-w-sm`}
              >
                {message.message}
              </div>
            </div>
          ))}
          {isLoading && (
            <div key={chatLog.length} className="flex justify-start">
              <div className="bg-[#191a23] rounded-lg p-4 text-white max-w-sm">
                <TypingAnimation />
              </div>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex-none p-6">
        <div className="bg-[#191a23] p-4 flex flex-wrap rounded-lg border border-gray-700">
          <input
            type="text"
            className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            disabled={inputValue <= 0}
            className="bg-indigo-500 rounded-full px-4 py-2 mt-2 md:mt-0 md:ml-2 text-white font-semibold focus:outline-none hover:bg-indigo-600 transition-colors duration-300 disabled:bg-gray-600 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" class="h-4 w-4 m-1 md:m-0" stroke-width="2"><path d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z" fill="currentColor"></path></svg>
          </button>
        </div>
      </form>
    </div>
  );
}
