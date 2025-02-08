import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";

const ProductDetails = ({ loading, setLoading }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function filterMealByCategory() {
      try {
        setLoading(true);
        const res = await axios(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const meal = res.data.meals[0];
        setProduct(meal);

        const ingredientsList = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.trim() !== "") {
            ingredientsList.push({ ingredient, measure });
          }
        }
        setIngredients(ingredientsList);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    }

    filterMealByCategory();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="proDetailsSec mt-5 pt-5">
      <div className="container  pt-5">
        <h1 className="mb-3 fw-bold">{product?.strMeal}</h1>
        <div className="row justify-content-between">
          {/* Image */}
          <div className="col-lg-4 col-md-6 col-12 mb-5">
            <div className="imageDiv w-100 overflow-hidden">
              <img
                src={product?.strMealThumb}
                className="w-100 rounded-3"
                alt={product?.strMeal}
              />
            </div>
            <div className="w-100 d-flex align-items-center justify-content-center gap-3 mt-3">
              <Link
                to={product?.strYoutube}
                className="btn btn-danger"
                target="_blank"
              >
                <i className="fa-brands fa-youtube me-2"></i>
                <span>Youtube</span>
              </Link>
              <Link
                to={product?.strSource}
                className="btn btn-success"
                target="_blank"
              >
                <i className="fa-solid fa-globe me-2"></i>
                <span>Source</span>
              </Link>
            </div>
          </div>
          {/* Description */}
          <div className=" descSide col-lg-4 col-md-6 col-12 mb-5">
            <h3 className="w-full text-center shadow-sm">
              Cooking Instructions{" "}
            </h3>
            <div className="w-100">
              <p className="description">{product?.strInstructions}</p>
            </div>
          </div>
          {/* Ingrediants */}
          <div className="col-lg-4 col-md-6 col-12 mb-5">
            <div className="ingredients w-100">
              <h3>Ingredients</h3>
              {ingredients.map((item, index) => (
                <div
                  key={index}
                  className="details d-flex align-items-center justify-content-between"
                >
                  <p>{item?.ingredient}:</p>
                  <p>{item?.measure}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
