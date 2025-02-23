import { X, MenuIcon, ChevronDown } from 'lucide-react';
import { menuItems } from '../../data/menuItems.jsx';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ isSidebarOpen, setSidebarOpen, activeSection, setActiveSection }) => {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpand = (key) => {
    setExpandedItems(prev => 
      prev.includes(key) 
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

  const handleItemClick = (item) => {
    if (item.subItems) {
      if (isSidebarOpen) {
        toggleExpand(item.key);
      }
    } else {
      setActiveSection(item.key);
    }
  };

  return (
    <aside className={`${isSidebarOpen ? 'w-64' : 'w-24'} fixed h-full bg-white border-r border-slate-200 transition-all duration-300 z-20`}>
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <div className={`overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}>
          <span className="text-2xl font-bold text-blue-600 whitespace-nowrap">DhanSetu</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      <nav className="p-4">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-2">
            <div
              onClick={() => handleItemClick(item)}
              className={`relative flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-200
                ${(activeSection === item.key || (item.subItems && item.subItems.some(sub => sub.key === activeSection))) 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-700 hover:bg-slate-100'}`}
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${isSidebarOpen ? 'mr-3' : ''}`}>
                  {item.icon}
                </div>
                <span className={`transition-all duration-300 ${isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'} whitespace-nowrap`}>
                  {item.title}
                </span>
              </div>
              {isSidebarOpen && item.subItems && (
                <div className={`ml-2 transition-transform duration-200 ${expandedItems.includes(item.key) ? 'rotate-180' : 'rotate-0'}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              )}
            </div>

            {item.subItems && (
              <div 
                className={`ml-6 space-y-1 overflow-hidden transition-all duration-300 ease-in-out
                  ${isSidebarOpen && expandedItems.includes(item.key) 
                    ? 'max-h-96 opacity-100 mt-1' 
                    : 'max-h-0 opacity-0'}`}
              >
                {item.subItems.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    onClick={() => setActiveSection(subItem.key)}
                    className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200
                      ${activeSection === subItem.key ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-100'}`}
                  >
                    <div className="flex-shrink-0 mr-2">
                      {subItem.icon}
                    </div>
                    <span className="whitespace-nowrap">{subItem.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
};

export default Sidebar;