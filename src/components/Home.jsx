import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../state/reducer";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.products);
  const cartItems = useSelector((state) => state.data.cartProducts);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => {
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
            <p className="text-pretty text-center font-semibold text-white mt-2 px-4 truncate">
              {product.title}
            </p>
            <button
              onClick={() => {
                cartItems.some((item) => item.id === product.id)
                  ? dispatch(removeFromCart(product.id))
                  : dispatch(addToCart(product));
              }}
              className= {cartItems.some((item) => item.id === product.id)
                ? "mt-auto mb-2 bg-red-700 text-white py-2 px-4 rounded-lg w-1/2 hover:bg-red-700 transition-colors"
                : "mt-auto mb-2 bg-red-500 text-white py-2 px-4 rounded-lg w-1/2 hover:bg-red-700 transition-colors"}
            >
              {cartItems.some((item) => item.id === product.id)
                ? `Remove from Cart`
                : `Add to Cart`}
            </button>
          </div>
        );
      })}
    </div>
  );
}
