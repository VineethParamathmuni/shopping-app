import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, increase, decrease } from "../state/reducer";
import { Link } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.cartProducts);

  let totalPrice = 0;

  return (
    console.log(products),
    <div>
      {products.length > 0 ? (
        <>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => { 
            function increment(){
              dispatch(increase({pid: product.id, cont : product.count}))
            }
            function decrement(){
              product.count > 1 ? dispatch(decrease({pid: product.id, cont : product.count})) : dispatch(removeFromCart(product.id))
            }
            totalPrice += product.count*product.price;                                           
            return (              
              <div
                key={index}
                className="flex flex-col items-center bg-cyan-900 border border-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-[1.02]"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-32 h-32 object-contain mt-4"
                />
                <p className="text-center font-semibold text-white mt-2 px-4 truncate">
                  {product.title}
                </p>
                <div className="flex">
                  <button className="mt-auto mb-2 bg-red-500 text-white py-2 px-4 rounded-lg w-1/2" onClick={decrement}>-</button>
                <p className="text-center font-semibold text-white mt-2 px-4">
                 {product.count}
                </p>
                <button className="mt-auto mb-2 bg-red-500 text-white py-2 px-4 rounded-lg w-1/2" onClick={increment}>+</button>
                </div>                
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
        <div>
          <p className="text-white my-10">
            Total Price : {totalPrice}
          </p>
        </div>
        </>
      ) : (
        <div className="flex flex-col space-y-10 justify-center items-center min-h-full">
          <p className="text-white font-semibold h-1/2">
            Your cart is empty!!
          </p>
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
