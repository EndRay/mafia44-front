// LoginForm.jsx
import {useEffect, useState} from "react";
import {login, me, logout, register} from "./authApi";
import { User } from "./App";

type LoginFormProps = {
  user: User | null;
  setUser: (user: User | null) => void;
}

export default function LoginForm({user, setUser}: LoginFormProps) {
  const [formUsername, setU] = useState("");
  const [formPassword, setP] = useState("");
  const [error, setErr] = useState(null);

  async function handleLogin() {
    setErr(null);
    try {
      const u = await login(formUsername, formPassword);
      setUser(u);
    } catch (err: any) {
      setErr(err.message);
    }
  }

  async function handleRegister() {
    setErr(null);
    try {
      const u = await register(formUsername, formPassword);
      setUser(u);
    } catch (err: any) {
      setErr(err.message);
    }
  }

  useEffect(() => {
    (async () => {
      const u = await me();
      if (u.id) setUser(u);
    })();
  }, [setUser]);

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  return (
    <div style={{ display: "inline-block" }}>
      <div className="border border-light rounded-3" style={{ width: 360, height: 250,
        display: "grid",
        placeItems: "center", padding: 16, textAlign: "center" }}>
        {user ? (
          <div>
            <p>Logged in as <b>{user.username}</b></p>
            <button className="btn btn-danger" onClick={handleLogout}>Log out</button>
          </div>
        ) : (
          <div>
            <div className="d-flex flex-column align-items-center">
              <input className="m-1" value={formUsername} onChange={(e) => setU(e.target.value)} placeholder="Username" />
              <input className="m-1" value={formPassword} onChange={(e) => setP(e.target.value)} type="password" placeholder="Password" />
              <div className="d-flex justify-content-end w-100">
                <button className="btn btn-primary m-1" onClick={handleLogin}>Log in</button>
                <button className="btn btn-secondary m-1" onClick={handleRegister}>Register</button>
              </div>
            </div>
            {error && <p style={{color: "crimson"}}>{error}</p>}

          </div>
        )}
      </div>
    </div>
  );
}
