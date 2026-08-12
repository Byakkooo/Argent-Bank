import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile, setUserError } from "../redux/userSlice";

import Header from "../components/Header";
import Footer from "../components/Footer";

function Profile() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.user.profile);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          dispatch(setUserError("Impossible de récupérer le profil."));
          return;
        }

        dispatch(setProfile(data.body));
        setUserName(data.body.userName);
      } catch {
        dispatch(setUserError("Impossible de contacter le serveur."));
      }
    };

    if (token) {
      getProfile();
    }
  }, [token, dispatch]);

  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userName,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        dispatch(setUserError("Impossible de modifier le pseudo."));
        return;
      }

      dispatch(setProfile(data.body));
      setUserName(data.body.userName);
    } catch {
      dispatch(setUserError("Impossible de contacter le serveur."));
    }
  };

  const handleCancel = () => {
    setUserName(profile?.userName || "");
  };

  return (
    <>
      <Header />

      <main className="profile-page">
        <section className="edit-profile">
          <h1>Edit user info</h1>

          <div className="edit-profile-row">
            <label htmlFor="username">User name:</label>
            <input
              id="username"
              type="text"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>

          <div className="edit-profile-row">
            <label htmlFor="firstname">First name:</label>
            <input
              id="firstname"
              type="text"
              value={profile?.firstName || ""}
              disabled
            />
          </div>

          <div className="edit-profile-row">
            <label htmlFor="lastname">Last name:</label>
            <input
              id="lastname"
              type="text"
              value={profile?.lastName || ""}
              disabled
            />
          </div>

          <div className="edit-profile-buttons">
            <button type="button" onClick={handleSave}>
              Save
            </button>

            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </section>

        <section className="accounts">
  <article className="account-card">
    <div>
      <h2>Argent Bank Checking (x8349)</h2>
      <p className="account-balance">$2,082.79</p>
      <p>Available Balance</p>
    </div>

    <span className="account-arrow">›</span>
  </article>

  <article className="account-card">
    <div>
      <h2>Argent Bank Savings (x6712)</h2>
      <p className="account-balance">$10,928.42</p>
      <p>Available Balance</p>
    </div>

    <span className="account-arrow">›</span>
  </article>

  <article className="account-card">
    <div>
      <h2>Argent Bank Credit Card (x8349)</h2>
      <p className="account-balance">$184.30</p>
      <p>Current Balance</p>
    </div>

    <span className="account-arrow">›</span>
  </article>
</section>
      </main>

      <Footer />
    </>
  );
}

export default Profile;