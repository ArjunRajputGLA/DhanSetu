import PropTypes from 'prop-types';

export const SettingsModal = ({
  textToSpeech,
  setTextToSpeech,
  autoScroll,
  setAutoScroll,
  setShowSettings
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-80">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Assistant Settings</h2>
        <button
          onClick={() => setShowSettings(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Text-to-Speech</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={textToSpeech}
              onChange={(e) => setTextToSpeech(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Auto-scroll</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
);

SettingsModal.propTypes = {
  textToSpeech: PropTypes.bool.isRequired,
  setTextToSpeech: PropTypes.func.isRequired,
  autoScroll: PropTypes.bool.isRequired,
  setAutoScroll: PropTypes.func.isRequired,
  setShowSettings: PropTypes.func.isRequired,
};

export default SettingsModal;