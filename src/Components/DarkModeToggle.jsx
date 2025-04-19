import { useEffect, useState } from 'react';

function DarkModeToggle() {
  const [enabled, setEnabled] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled((prev) => !prev)}
      className="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded-full shadow hover:scale-105 transition"
    >
      {enabled ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}

export default DarkModeToggle;
