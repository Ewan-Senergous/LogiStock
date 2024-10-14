import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import "../../styles/navbar.css";
import MenuBurger from "./MenuBurger";

export default function Navbar() {
  return (
    <>
      <nav>
        <section>
          <Link to="/manutention">Manutention</Link>
        </section>
        <Link to="/">
          <img src={Logo} alt="Miam" className="logo" />
        </Link>
        <MenuBurger />
        <section>
          <Link to="/register">Inscription</Link>
          <Link to="/login">
            <button type="button">Connexion</button>
          </Link>
        </section>
      </nav>
      <hr />
    </>
  );
}
