import { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };
  
  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-6">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full px-4 py-2 pl-14 pr-4 text-slate-800 bg-slate-100 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-500 placeholder:pl-1"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-1">
          <svg
            className="w-5 h-5 text-slate-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;