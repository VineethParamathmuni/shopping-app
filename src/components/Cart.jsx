import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increase,
  decrease,
  emptyCart,
} from "../state/reducer";
import { Link } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.cartProducts);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const searchCriteria = (value) => value.toLowerCase().replace(" ", "");

  const productsAfterSearch = products.filter((product) =>
    searchCriteria(product.title).includes(searchCriteria(search))
  );
  const productsAfterFilter = productsAfterSearch.filter((product) =>
    filter ? product.category === filter : true
  );
  let totalPrice = 0;

  const productsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentTasks = productsAfterFilter.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(currentTasks.length / productsPerPage);
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
    <div>
      {products.length > 0 ? (
        <>
          <div className="space-x-20">
            <input
              className="w-2/5 p-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              value={search}
              placeholder="Enter search value"
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="w-2/5 p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">Select the filter</option>
              <option value="men's clothing">Men's clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
              <option value="women's clothing">Women's clothing</option>
            </select>
            <button
              className="mx-4 my-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700  transition-colors"
              onClick={() => setFilter("")}
            >
              Reset Filter
            </button>
          </div>

          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentTasks.map((product, index) => {
              function increment() {
                dispatch(increase(product.id));
              }
              function decrement() {
                product.count > 1
                  ? dispatch(decrease(product.id))
                  : dispatch(removeFromCart(product.id));
              }
              totalPrice += product.count * product.price;
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
                  <p className="text-center text-pretty font-semibold text-white my-2 px-4">
                    {product.title}
                  </p>
                  <div className="flex">
                    <button
                      className="mt-auto mb-2 bg-red-500 text-white py-2 px-4 rounded-lg w-1/2"
                      onClick={decrement}
                    >
                      -
                    </button>
                    <p className="text-center font-semibold text-white mt-2 px-4">
                      {product.count}
                    </p>
                    <button
                      className="mt-auto mb-2 bg-red-500 text-white py-2 px-4 rounded-lg w-1/2"
                      onClick={increment}
                    >
                      +
                    </button>
                  </div>
                  <p className="mb-2 text-white">
                    ₹{product.count * product.price}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(product.id))}
                    className="mt-auto mb-2 bg-red-500 text-white py-2 px-4 rounded-lg w-1/2  hover:bg-red-700  transition-colors"
                  >
                    Remove from Cart
                  </button>
                </div>
              );
            })}
          </div>
          {currentTasks.length > 0 && <div className="flex space-x-10 my-4 ">
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
                className={`p-2 rounded hover:bg-green-600 ${
                  currentPage === index + 1
                    ? "bg-red-500 text-white"
                    : "bg-red-300 text-white"
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
          </div>}
          

          <div className="space-y-5">
            <p className="text-white">Total Price : {totalPrice}</p>
            <button
              className=" bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors h-1/2"
              onClick={() => dispatch(emptyCart())}
            >
              Empty the cart
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col space-y-10 justify-center items-center min-h-full">
          <p className="text-white font-semibold h-1/2">Your cart is empty!!</p>
          <Link to="/">
            <button className=" bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors h-1/2">
              Go to Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
