import logo from "../images/logo-ANCLA.png";

const Logo = () => {
  return (
    <div>
      <img src={logo} alt="School Logo" />
      <p className="main--description">
        Keep track of enrolled students and teachers for the current school
        year.
      </p>
    </div>
  );
};

export default Logo;
