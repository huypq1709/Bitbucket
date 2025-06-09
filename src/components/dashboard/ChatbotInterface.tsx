import React, { useEffect, useState, useRef } from 'react';
import { useChatbot } from '../../hooks/useApi';
import { MessageCircleIcon, SendIcon, LoaderIcon, XIcon, SparklesIcon, BrainCircuitIcon } from 'lucide-react';
const ChatbotInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBotSelect, setShowBotSelect] = useState(false);
  const [activeBot, setActiveBot] = useState<'gemini' | 'chatbot2'>('gemini');
  const [message, setMessage] = useState('');
  const {
    chatHistory,
    sending,
    sendMessage
  } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleSendMessage = () => {
    if (message.trim() && !sending) {
      sendMessage(activeBot, message);
      setMessage('');
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const selectBot = (bot: 'gemini' | 'chatbot2') => {
    setActiveBot(bot);
    setShowBotSelect(false);
    setIsOpen(true);
  };
  const toggleChat = () => {
    if (!isOpen) {
      setShowBotSelect(true);
    } else {
      setIsOpen(false);
      setShowBotSelect(false);
    }
  };
  return <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-4">
      {/* Bot Selection Popup */}
      {showBotSelect && !isOpen && <div className="flex flex-col items-end space-y-3 mb-4">
          <button onClick={() => selectBot('gemini')} className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110">
            <SparklesIcon size={20} />
          </button>
          <button onClick={() => selectBot('chatbot2')} className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-transform hover:scale-110">
            <BrainCircuitIcon size={20} />
          </button>
        </div>}
      {/* Chat Interface */}
      {isOpen && <div className="w-[380px] h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-indigo-600 text-white">
            <div className="flex items-center">
              {activeBot === 'gemini' ? <SparklesIcon size={20} className="mr-2" /> : <BrainCircuitIcon size={20} className="mr-2" />}
              <span className="font-medium">
                {activeBot === 'gemini' ? 'Gemini' : 'Chatbot 2'}
              </span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <XIcon size={20} />
            </button>
          </div>
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {chatHistory.length === 0 ? <div className="text-center text-gray-500 py-8">
                <p>
                  Hãy bắt đầu cuộc trò chuyện với{' '}
                  {activeBot === 'gemini' ? 'Gemini' : 'Chatbot 2'}
                </p>
                <p className="text-sm mt-2">
                  Ví dụ: "Phân tích xu hướng thị trường hôm nay"
                </p>
              </div> : chatHistory.map((chat, index) => <div key={index} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${chat.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-800'}`}>
                    <p className="text-sm">{chat.message}</p>
                  </div>
                </div>)}
            {sending && <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                  <LoaderIcon size={16} className="animate-spin text-gray-500" />
                </div>
              </div>}
            <div ref={messagesEndRef} />
          </div>
          {/* Chat Input */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center space-x-2">
              <textarea value={message} onChange={e => setMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder={`Nhắn tin với ${activeBot === 'gemini' ? 'Gemini' : 'Chatbot 2'}...`} className="flex-1 resize-none border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500 text-sm px-4 py-2" rows={1} />
              <button onClick={handleSendMessage} disabled={!message.trim() || sending} className={`p-2 rounded-full ${!message.trim() || sending ? 'bg-gray-300 text-gray-500' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                <SendIcon size={18} />
              </button>
            </div>
          </div>
        </div>}
      {/* Main Chat Button */}
      <button onClick={toggleChat} className={`flex items-center justify-center w-14 h-14 rounded-full ${isOpen ? 'bg-gray-600' : 'bg-indigo-600'} text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110`}>
        {isOpen ? <XIcon size={24} /> : <MessageCircleIcon size={24} />}
      </button>
    </div>;
};
export default ChatbotInterface;