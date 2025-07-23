const Login = () => {
  return (
    <div>
      <h1 className="welcome-header">
        Welcome to <span>ExpenseNotify</span>
      </h1>
      <div className="auth-wrapper">
        <h2 className="auth-title">Login</h2>
        <form className="auth-form">
          <input type="username" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="auth-button">Log In</button>
        </form>
        <p className="auth-footer">Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;