import { Link } from "react-router-dom";
import "../styles/footer.css";
import facebook from "../assets/images/facebook.svg";
import twitter from "../assets/images/twitter.svg";
import linkedin from "../assets/images/linkedin.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section Catégories */}
        <div className="footer-section">
          <h4>Catégories</h4>
          <ul>
            <li>
              <Link to="/transpalettes">Transpalettes</Link>
            </li>
            <li>
              <Link to="/gerbeurs">Gerbeurs</Link>
            </li>
            <li>
              <Link to="/chariots-elevateurs">Chariots Élévateurs</Link>
            </li>
            <li>
              <Link to="/diables">Diables</Link>
            </li>
          </ul>
        </div>

        {/* Section Services */}
        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li>
              <Link to="/livraison">Livraison</Link>
            </li>
            <li>
              <Link to="/support-technique">Support Technique</Link>
            </li>
            <li>
              <Link to="/location">Location de Matériel</Link>
            </li>
            <li>
              <Link to="/retours">Politique de Retours</Link>
            </li>
          </ul>
        </div>

        {/* Section Informations */}
        <div className="footer-section">
          <h4>Informations</h4>
          <ul>
            <li>
              <Link to="/a-propos">À Propos</Link>
            </li>
            <li>
              <Link to="/contact">Contactez-nous</Link>
            </li>
            <li>
              <Link to="/carriere">Carrières</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Section Contact */}
        <div className="footer-section">
          <h4>Nous contacter</h4>
          <p>Adresse: 123 Rue de la Logistique, Paris, France</p>
          <p>Téléphone: +33 1 23 45 67 89</p>
          <p>
            Email:{" "}
            <a href="mailto:support@manutention.com">support@manutention.com</a>
          </p>
          <div className="social-media">
            <Link
              to="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} alt="Facebook" className="social-icon" />
            </Link>
            <Link
              to="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitter} alt="Twitter" className="social-icon" />
            </Link>
            <Link
              to="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="LinkedIn" className="social-icon" />
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Manutention Logistics. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
