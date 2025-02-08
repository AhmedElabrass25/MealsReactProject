import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
import MyNav from "./MyNav";
import { useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";

const App = () => {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  //   >>>>>>>>>>>>>>>>>>All Meals
  async function getProducts() {
    try {
      setLoading(true);
      let res = await axios(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      console.log(res);
      console.log(res.data.meals);
      setProducts(res.data.meals);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  // Search By name or letter
  async function SearchByWord() {
    try {
      setLoading(true);
      let res = await axios(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`
      );
      console.log(res);
      setProducts(res.data.meals);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <HashRouter>
        <MyNav setWord={setWord} SearchByWord={SearchByWord} />
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                getProducts={getProducts}
                products={products}
                setProducts={setProducts}
                loading={loading}
                setLoading={setLoading}
              />
            }
          />
          <Route
            path="/productdetails/:id"
            element={
              <ProductDetails loading={loading} setLoading={setLoading} />
            }
          />
        </Routes>
        <Footer />
      </hash>
    </div>
  );
};

export default App;
