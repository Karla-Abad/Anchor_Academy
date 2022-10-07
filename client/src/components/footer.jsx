import { ReactComponent as Instagram } from "../images/instagram.svg";
import { ReactComponent as Facebook } from "../images/facebook.svg";
import { ReactComponent as Twitter } from "../images/twitter.svg";
import { ReactComponent as Youtube } from "../images/youtube.svg";

const Footer = () => {
  return (
    <div className="login__footer">
      <p className="login__footer-text">
        Unidad Educativa Academia Naval Cap. Leonardo Abad A.
      </p>
      <p className="login__footer-text">Calle 19 y Avenida Malecon</p>
      <p className="login__footer-text">La Libertad, Santa Elena - Ecuador</p>
      <p className="login__footer-text">Telf: (04) 2777- 4875</p>
      <hr />
      <Instagram />
      <Facebook />
      <Twitter />
      <Youtube />
    </div>
  );
};

export default Footer;
