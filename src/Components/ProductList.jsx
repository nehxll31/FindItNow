import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import ProductModal from './ProductModal';
import CategoryFilter from './CategoryFilter';

function ProductList({ onProductClick, showLoginPrompt }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  const [selected, setSelected] = useState(null); 
  const [loading, setLoading] = useState(true);
  const convertToRupees = (dollars) => (dollars * 83).toFixed(2);

  useEffect(() => {
    setLoading(true);
    setError(null); 
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });
  }, []);
    
  const handleSearch = (query) => {
    const lower = query.toLowerCase();
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(lower) &&
      (category === '' || product.category === category)
    );
    setFiltered(results);
  };
  
  const handleCategorySelect = (cat) => {
    setCategory(cat);
    const results = products.filter((product) =>
      product.title.toLowerCase().includes('') &&
      (cat === '' || product.category === cat)
    );
    setFiltered(results);
  };

  const handleProductClick = (product) => {
    setSelected(product);
    if (onProductClick) {
      onProductClick(product);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {Array(8).fill().map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse bg-white dark:bg-gray-800 p-4 rounded shadow"
          >
            <div className="bg-gray-300 dark:bg-gray-700 h-40 w-full mb-4 rounded" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }
  
    
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }
    
  return (
    <div className="p-4">
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter onSelect={handleCategorySelect} />
      
      {filtered.length === 0 ? (
  <div className="text-center text-gray-500 dark:text-gray-400 mt-8 text-lg">
    No products match your search.
  </div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
    {filtered.map((product) => (
      <div
        key={product.id}
        className="bg-white dark:bg-gray-800 shadow-md rounded p-4 hover:shadow-lg transition cursor-pointer"
        onClick={() => handleProductClick(product)}
      >
        <img 
          src={product.image} 
          alt={product.title} 
          className="h-40 mx-auto object-contain" 
        />
        <h3 className="mt-2 font-semibold text-md dark:text-white">{product.title}</h3>
        <p className="text-blue-600 dark:text-blue-400 font-bold">
          ₹{convertToRupees(product.price)}
        </p>
      </div>
    ))}
  </div>
)}


      {selected && !showLoginPrompt && (
        <ProductModal 
          product={selected} 
          onClose={() => setSelected(null)} 
        />
      )}
    </div>
  );
}

export default ProductList;