function ProductModal({ product, onClose }) {
    if (!product) return null;
  
    return (
      <div className="bg-white p-4 sm:p-6 rounded shadow-lg w-[90%] sm:max-w-md relative max-h-[90vh] overflow-y-auto">
        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
            ✕
          </button>
          <img src={product.image} alt={product.title} className="h-48 mx-auto object-contain" />
          <h2 className="mt-4 text-xl font-bold">{product.title}</h2>
          <p className="text-sm text-gray-600 mt-2">{product.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-blue-600">${product.price}</span>
            <span className="text-sm text-gray-500 bg-gray-200 rounded-full px-2 py-1">{product.category}</span>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProductModal;
  