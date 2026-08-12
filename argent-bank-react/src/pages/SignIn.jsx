import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  loginSuccess,
  loginFailure,
} from "../redux/authSlice";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        dispatch(loginFailure("Email ou mot de passe incorrect."));
        return;
      }

      dispatch(loginSuccess(data.body.token));

      navigate("/profile");
    } catch {
      dispatch(
        loginFailure("Impossible de contacter le serveur.")
      );
    }
  };

  return (
    <>
      <Header />

      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>

          <h1>Sign In</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />
            </div>

            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
              />
              <label htmlFor="remember-me">
                Remember me
              </label>
            </div>

            {error && (
              <p className="error-message">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="sign-in-button"
            >
              Sign In
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default SignIn;