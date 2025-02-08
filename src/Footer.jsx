import { Link } from "react-router-dom";
import logo from "./assets/logo-BfNap0Pe.png";

const Footer = () => {
  return (
    <>
      <footer className="shadow-lg w-100 d-flex align-items-center justify-content-center">
        <div>
          <Link className="w-100" to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <p className="m-0 ms-3">© 2025 Your Website. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Footer;
