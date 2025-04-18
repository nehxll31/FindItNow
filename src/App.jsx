import { useEffect, useState } from 'react';
import { useAuth } from './Context/AuthContext';
import ProductList from './Components/ProductList';
import DarkModeToggle from './Components/DarkModeToggle';
import Login from './Components/Login';
import Signup from './Components/SignUp';
import ProductModal from './Components/ProductModal'; 

function App() {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [showSignup, setShowSignup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAuthForm, setShowAuthForm] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      setTheme(current);
    });

    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    return () => observer.disconnect();
  }, []);

  const handleProductClick = (product) => {
    if (!user) {
      setSelectedProduct(product);
      setShowAuthForm(true);
      setShowSignup(false);
    } else {
      setSelectedProduct(product); // ✅ Triggers modal when logged in
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthForm(false);
    setSelectedProduct(null);
  };

  return (
    <div key={theme} className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Auth modal */}
      {!user && showAuthForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full px-6 py-8">
              <button
                onClick={() => setShowAuthForm(false)}
                className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white text-lg"
                aria-label="Close"
              >
                ✕
              </button>

              {showSignup ? (
                <Signup 
                  onToggle={() => setShowSignup(false)}
                  onSuccess={handleAuthSuccess}
                />
              ) : (
                <Login 
                  onToggle={() => setShowSignup(true)}
                  onSuccess={handleAuthSuccess}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-md py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-500 dark:text-blue-300">
            FindItNow
          </h1>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm dark:text-white">
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowAuthForm(true);
                  setShowSignup(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition"
              >
                Login
              </button>
            )}
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">     
        <ProductList 
          onProductClick={handleProductClick} 
          showLoginPrompt={!user && selectedProduct}
        />
      </main>

      {user && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
