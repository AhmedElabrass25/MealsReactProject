import { Link } from "react-router-dom";
import logo from "./assets/logo-BfNap0Pe.png";
const MyNav = ({ setWord, SearchByWord }) => {
  function handleSearch(e) {
    e.preventDefault();
    SearchByWord();
  }
  return (
    <nav className="navbar navbar-expand-lg shadow-sm">
      <div className="container w-100">
        <div className="row w-100 align-items-center">
          {/* Logo image */}
          <div className="col-md-3 col-3">
            <Link className="navbar-brand w-100" to="/">
              <img src={logo} alt="logo" className="w-100" />
            </Link>
          </div>
          {/* Form */}
          <div className="col-md-9 col-9">
            <form className="d-flex  me-auto w-100" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setWord(e.target.value)}
              />
              <button
                onClick={(e) => handleSearch(e)}
                className="btn btn-outline-success"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNav;
