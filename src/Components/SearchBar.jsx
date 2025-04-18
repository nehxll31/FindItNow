import { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(input);
    }, 300); 

    return () => clearTimeout(delayDebounce);
  }, [input, onSearch]);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
