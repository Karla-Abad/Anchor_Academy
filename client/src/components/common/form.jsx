import Input from "./input";

const Form = ({
  onSubmit,
  loggedInUser,
  email,
  setEmail,
  password,
  setPassword,
  errorMessage,
  onOpenForm,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        name="email"
        value={email}
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        value={password}
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && <p className="error">{errorMessage}</p>}
      <button
        onClick={(e) => loggedInUser.onSubmit(e)}
        className="btn btn--stretched btn--blue"
      >
        Log In
      </button>
      <hr></hr>
      <div className="btn btn--green" onClick={onOpenForm}>
        Register
      </div>
    </form>
  );
};

export default Form;
