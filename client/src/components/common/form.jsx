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
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
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
