import { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import PropTypes from 'prop-types';

export const ChatInput = ({ input, setInput, handleSend, isLoading }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your financial question... (Press Enter to send)"
        className="flex-1 resize-none rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px] max-h-[200px] overflow-y-auto"
        rows="1"
      />
      <button
        onClick={handleSend}
        disabled={!input.trim() || isLoading}
        className={`px-4 rounded-lg flex-shrink-0 ${
          !input.trim() || isLoading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
};

ChatInput.propTypes = {
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
  handleSend: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};