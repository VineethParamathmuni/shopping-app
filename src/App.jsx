import { useState, useEffect } from "react";
import { Circles } from "react-loader-spinner";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import { useDispatch, useSelector } from "react-redux";
import { addToList } from "./state/reducer";

function App() {
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.data.cartProducts.length)
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const products = await fetch("https://fakestoreapi.com/products");
    const prodFinal = await products.json();
    const prod = prodFinal.map((prod) => ({
      ...prod,
      count: 1,
    }));
    if (prod) {    
      setLoading(false);
      dispatch(addToList(prod));
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <div className="min-h-screen w-full flex items-center justify-center">
            <Circles color="red" height={"120"} width={"120"} visible={true} />
          </div>
        ) : (
          <div>
            <div className="flex items-center w-full p-4">
              <Link className="flex-1 text-white text-center font-bold px-4 py-2" to="/">
              Shopping App                
              </Link>
              <ul className="flex flex-1 mx-4 px-4 py-2">
                <li className="flex px-4 py-2 h-1/2 m-auto text-center">
                  <Link
                    className="text-white py-2 px-4 bg-red-500  hover:bg-red-700 rounded-lg transition-colors"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="flex py-2 px-4 h-1/2 m-auto text-center">
                  <Link
                    className="text-white py-2 px-4 bg-red-500  hover:bg-red-700 rounded-lg transition-colors"
                    to="/cart"
                  >
                    
                    Cart {cartCount > 0 ? <span className="px-1 text-black bg-yellow-50 rounded-full border-2 border-black">{cartCount}</span> : null}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/cart" element={<Cart />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
