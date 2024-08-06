import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../state/reducer";
import React, { useState } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.products);
  const cartItems = useSelector((state) => state.data.cartProducts);

  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentTasks = products.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(products.length / productsPerPage);
  const paginate = (PageNumber) => setCurrentPage(PageNumber);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentTasks.map((product, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-900 border border-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-[1.02]"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-32 object-contain mt-4"
              />
              <p className="text-pretty text-center font-semibold text-white mt-2 px-4">
                {product.title}
              </p>
              <button
                onClick={() => {
                  cartItems.some((item) => item.id === product.id)
                    ? dispatch(removeFromCart(product.id))
                    : dispatch(addToCart(product));
                }}
                className={`mt-auto mb-2 text-white text-wrap py-2 px-4 rounded-lg w-1/2 transition-colors ${
                  cartItems.some((item) => item.id === product.id) ? "bg-red-700 hover:bg-red-700" : "bg-red-500 hover:bg-red-700"
                }`}
              >
                {cartItems.some((item) => item.id === product.id)
                  ? `Remove from Cart`
                  : `Add to Cart`}
              </button>
            </div>
          );
        })}
      </div>
      {currentTasks.length > 0 && (
        <div className="flex flex-row justify-center space-x-10 my-4 ">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="bg-red-500 text-white px-6 rounded"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`p-2 rounded hover:bg-white hover:text-black ${
                currentPage === index + 1
                  ? "bg-red-800 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="bg-red-500 text-white px-6 rounded"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
