import './Auth.scss';

const Signup = () => {
  return (
    <div>
      <h1 className="welcome-header">
        Welcome to <span>ExpenseNotify</span>
      </h1>
      <div className="auth-wrapper">
        <h2 className="auth-title">Sign Up</h2>
        <form className="auth-form">
          <input type="username" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="auth-button">Create Account</button>
        </form>
        <p className="auth-footer">Already have an account? <a href="/login">Log in</a></p>
      </div>
    </div>
  );
};

export default Signup;