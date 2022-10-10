const Form = ({
  onSubmit,
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
      <button className="btn btn--stretched btn--blue">Log In</button>
      <hr></hr>
      <div className="btn btn--green" onClick={onOpenForm}>
        Register
      </div>
    </form>
  );
};

export default Form;
