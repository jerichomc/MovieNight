function AuthPage({
  authMode,
  authForm,
  authError,
  onAuthFormChange,
  onAuthSubmit,
  onAuthModeChange,
}) {
  const isRegisterMode = authMode === "register"; // this variable is true if the current mode is "register", otherwise false

  return (
    <>
      <header className="page-header">
        <h1>{isRegisterMode ? "Create Account" : "Log In"}</h1>
        <p>
          {isRegisterMode
            ? "Create an account to save your movie nights."
            : "Log in to continue planning your movie nights."}
        </p>
      </header>

      <section className="auth-section">
        <form className="auth-form" onSubmit={onAuthSubmit}>
          {isRegisterMode && (
            <label>
              Username
              <input
                type="text"
                name="username"
                value={authForm.username}
                onChange={onAuthFormChange}
                placeholder="moviefan123"
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              name="email"
              value={authForm.email}
              onChange={onAuthFormChange}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={authForm.password}
              onChange={onAuthFormChange}
              placeholder="Enter your password"
            />
          </label>

          {authError && <p className="error-message">{authError}</p>}

          <button type="submit">
            {isRegisterMode ? "Create Account" : "Log In"}
          </button>
        </form>

        <div className="auth-switch">
          {isRegisterMode ? (
            <>
              <p>Already have an account?</p>
              <button type="button" onClick={() => onAuthModeChange("login")}>
                Log In
              </button>
            </>
          ) : (
            <>
              <p>Need an account?</p>
              <button
                type="button"
                onClick={() => onAuthModeChange("register")}
              >
                Create Account
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default AuthPage;