import { User, Bot, Copy, Volume2 } from 'lucide-react';
import PropTypes from 'prop-types';

// Updated helper function to format the message content with proper spacing
const FormattedContent = ({ content }) => {
  // Split content into segments based on ** markers
  const segments = content.split(/(\*\*.*?\*\*)/g);

  return (
    <span>
      {segments.map((segment, index) => {
        if (segment.startsWith('**') && segment.endsWith('**')) {
          // Remove the ** markers and wrap in bold span
          const text = segment.slice(2, -2);
          // Add a space before if not at the start and previous segment doesn't end with space
          const prevEndsWithSpace = index > 0 && segments[index - 1].endsWith(' ');
          // Add a space after if not at the end and next segment doesn't start with space
          const nextStartsWithSpace = index < segments.length - 1 && segments[index + 1].startsWith(' ');
          
          return (
            <span key={index}>
              {!prevEndsWithSpace && index > 0 && ' '}
              <span className="font-semibold text-inherit">{text}</span>
              {!nextStartsWithSpace && index < segments.length - 1 && ' '}
            </span>
          );
        }
        return <span key={index}>{segment}</span>;
      })}
    </span>
  );
};

FormattedContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export const Message = ({ message, formatTimestamp, copyMessage, speakMessage, textToSpeech }) => (
  <div 
    className={`
      flex items-start gap-3 
      ${message.role === 'user' ? 'flex-row-reverse' : ''}
      animate-in fade-in slide-in-from-bottom duration-300
    `}
  >
    {/* Avatar */}
    <div 
      className={`
        flex-shrink-0 rounded-full p-2.5 
        ${message.role === 'user' 
          ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
          : 'bg-gradient-to-br from-gray-100 to-gray-200'
        }
        shadow-sm hover:shadow-md transition-all duration-200
        hover:scale-105
      `}
    >
      {message.role === 'user' ? (
        <User className="w-5 h-5 text-white" />
      ) : (
        <Bot className="w-5 h-5 text-gray-700" />
      )}
    </div>

    {/* Message Content */}
    <div className="group relative max-w-[70%] min-w-0">
      <div 
        className={`
          relative rounded-2xl shadow-sm
          ${message.role === 'user'
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
            : 'bg-white border border-gray-200'
          }
          p-4
          transition-all duration-200
          hover:shadow-md
          ${message.role === 'user' 
            ? 'hover:from-blue-600 hover:to-blue-700' 
            : 'hover:bg-gray-50'
          }
        `}
      >
        {/* Message Text with Formatting */}
        <p className="break-words whitespace-pre-wrap text-[15px] leading-relaxed">
          <FormattedContent content={message.content} />
        </p>

        {/* Timestamp */}
        {message.timestamp && (
          <div 
            className={`
              mt-2 text-xs font-medium
              ${message.role === 'user' 
                ? 'text-blue-100' 
                : 'text-gray-400'
              }
            `}
          >
            {formatTimestamp(message.timestamp)}
          </div>
        )}

        {/* Action Buttons */}
        <div 
          className={`
            absolute top-1/2 transform -translate-y-1/2
            ${message.role === 'user' ? '-left-12' : '-right-12'}
            opacity-0 scale-95 translate-x-2
            group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0
            transition-all duration-200
          `}
        >
          <div className="flex flex-col gap-2">
            <button
              className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl 
                         transition-all duration-200 hover:scale-110"
              onClick={() => copyMessage(message.content)}
              title="Copy message"
            >
              <Copy className="h-4 w-4 text-gray-600" />
            </button>
            {textToSpeech && message.role === 'assistant' && (
              <button
                className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl 
                           transition-all duration-200 hover:scale-110"
                onClick={() => speakMessage(message.content)}
                title="Play message"
              >
                <Volume2 className="h-4 w-4 text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

Message.propTypes = {
  message: PropTypes.shape({
    role: PropTypes.oneOf(['user', 'assistant']).isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
  formatTimestamp: PropTypes.func.isRequired,
  copyMessage: PropTypes.func.isRequired,
  speakMessage: PropTypes.func.isRequired,
  textToSpeech: PropTypes.bool.isRequired,
};

export default Message;