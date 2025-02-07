import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Home = ({ getProducts, setProducts, products, loading, setLoading }) => {
  const [lists, setLists] = useState([]);
  const [activeItem, setActiveItem] = useState("All");
  //   >>>>>>>>>>>>>>>>>>Get Meal Lists
  async function getMealLists() {
    try {
      setLoading(true);
      let res = await axios(
        "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
      );
      console.log(res);
      console.log(res.data.meals);
      setLists(res.data.meals);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  //   >>>>>>>>>>>>>>>>>>Filter Meal by Category
  async function filterMealByCategory(category) {
    try {
      setLoading(true);
      let res = await axios(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
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
  useEffect(() => {
    getProducts();
    getMealLists();
  }, []);
  return (
    <section className="mealSec pt-5 mt-5">
      <div className="container">
        <h1 className="title my-5 w-100 text-center fw-bold">
          Learn, Cook, Eat Your Food
        </h1>
        {loading && <Loading />}
        {/* >>>>>All Categories>>>>>>>>> */}
        <div className="lists row w-100 gap-3 justify-content-center mb-5 ">
          <p
            onClick={() => {
              getProducts();
              setActiveItem("All");
            }}
            className={`w-auto rounded-5 py-2 px-4 cursor-pointer ${
              activeItem === "All" ? "bg-black text-white" : ""
            }`}
          >
            All
          </p>
          {lists?.length > 0 &&
            lists.map((list) => {
              return (
                <p
                  onClick={() => {
                    filterMealByCategory(list.strCategory);
                    setActiveItem(list.strCategory);
                  }}
                  key={list.strCategory}
                  className={`w-auto rounded-5 py-2 px-4 cursor-pointer ${
                    activeItem === list.strCategory ? "bg-black text-white" : ""
                  }`}
                >
                  {list.strCategory}
                </p>
              );
            })}
        </div>
        {/* >>>>>Meals>>>>>>>>> */}
        {loading && <Loading />}
        <div className="row justify-content-between mt-3">
          {products?.length > 0 &&
            products?.map((pro) => {
              return (
                <div className="col-lg-3 col-md-4 col-12" key={pro?.idMeal}>
                  <div className="w-100 mealCard mb-5">
                    <div className="imgDiv w-100 text-center mb-3">
                      <img src={pro?.strMealThumb} className="w-100" alt="" />
                    </div>
                    <h5 className="mb-1 fw-bold">
                      {pro?.strMeal.split(" ").slice(0, 2).join(" ")}
                    </h5>
                    {pro?.strArea && (
                      <p className="city mb-0 w-100 d-flex align-items-center justify-content-center">
                        <i className="fa-solid fa-earth-americas me-1 fs-6"></i>
                        {pro.strArea}
                      </p>
                    )}
                    <Link to={`productdetails/${pro?.idMeal}`} className="btn">
                      view recipe
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Home;
