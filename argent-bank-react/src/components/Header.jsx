import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/authSlice";
import { clearProfile } from "../redux/userSlice";

import logo from "../assets/images/argentBankLogo.png";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  const profile = useSelector((state) => state.user.profile);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProfile());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div className="main-nav-right">
        {isAuthenticated ? (
          <>
            {/* Pseudo */}
            <Link className="main-nav-username" to="/profile">
              {profile?.userName || "Profile"}
            </Link>

            {/* Utilisateur */}
            <Link
              className="main-nav-icon"
              to="/profile"
              aria-label="Profile"
            >
              <i className="fa fa-user-circle"></i>
            </Link>

            {/* Engrenage présent sur la maquette */}
            <span className="main-nav-icon" aria-hidden="true">
              <i className="fa fa-cog"></i>
            </span>

            {/* Déconnexion */}
            <button
              type="button"
              className="main-nav-icon logout-button"
              onClick={handleLogout}
              aria-label="Sign Out"
            >
              <i className="fa fa-power-off"></i>
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;