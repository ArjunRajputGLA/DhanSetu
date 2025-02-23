import { useState, useRef, useCallback, useEffect } from 'react';
import { Bot, RefreshCcw, Eraser, Download, Settings } from 'lucide-react';
import { Message } from './Message';
import { ChatInput } from './ChatInput';
import { SettingsModal } from './SettingsModal';
import { getGroqResponse } from './services/api';
import { useSpeech } from '../../hooks/useSpeech';

const FinancialAssistant = () => {
  // Keeping all your original state and hooks
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your AI financial assistant. I can help you with investment strategies, market analysis, portfolio optimization, and more. How can I assist you today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);
  const { speakMessage, stopSpeaking } = useSpeech();

  // Keeping all your original functions
  const scrollToBottom = useCallback(() => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [autoScroll]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    stopSpeaking();

    const newUserMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getGroqResponse([...messages, newUserMessage]);
      
      const newAiMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, newAiMessage]);

      if (textToSpeech) {
        speakMessage(aiResponse);
      }
    } catch (error) {
      console.error('Error in handleSend:', error);
      const errorMessage = {
        role: 'assistant',
        content: "I apologize, but I encountered an error processing your request. Please try again.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    stopSpeaking();
    setMessages([{
      role: 'assistant',
      content: "Hello! I'm your AI financial assistant. How can I help you today?",
      timestamp: new Date().toISOString()
    }]);
  };

  const downloadChat = () => {
    const chatContent = messages
      .map(msg => `[${formatTimestamp(msg.timestamp)}] ${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n\n');
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-chat-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-10 bg-white rounded-t-xl border-b shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  Dhannu
                </h1>
                <p className="text-sm text-gray-500">Your AI-powered financial advisor</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearChat}
                className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                title="Clear chat"
              >
                <Eraser className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={downloadChat}
                className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                title="Download chat"
              >
                <Download className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                title="Settings"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          textToSpeech={textToSpeech}
          setTextToSpeech={setTextToSpeech}
          autoScroll={autoScroll}
          setAutoScroll={setAutoScroll}
          setShowSettings={setShowSettings}
        />
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden bg-gradient-to-b from-gray-50 to-white border-x">
        <div className="h-full px-4 py-6 overflow-y-auto">
          <div className="space-y-6 mb-4">
            {messages.map((message, index) => (
              <Message
                key={index}
                message={message}
                formatTimestamp={formatTimestamp}
                copyMessage={() => navigator.clipboard.writeText(message.content)}
                speakMessage={speakMessage}
                textToSpeech={textToSpeech}
              />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-500 p-4 bg-white rounded-xl border border-gray-100 shadow-sm animate-pulse">
                <RefreshCcw className="w-4 h-4 animate-spin" />
                <span>Processing your request...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t bg-white p-4 rounded-b-xl">
        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default FinancialAssistant;