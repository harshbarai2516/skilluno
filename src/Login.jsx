import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 1. Check if already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      navigate("/"); // Redirect if already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Login Attempt:", { username }); // Avoid logging password

      const res = await fetch("http://api.goldbazar.co.in/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Login Response:", data);

      if (data.message === "Authentication successful") {
        console.log("Login Successful:", data.user.balance);
        localStorage.setItem("username", data.user.username); // 2. Save user login
         localStorage.setItem("balance", data.user.balance);
        const result_res = await fetch("https://api.goldbazar.co.in/api/results/generate-24h",{
            method:"post"
        });

            const result_data = await result_res.json();
            console.log("Result Generation Response:", result_data);
        
        navigate("/home");
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: sans-serif; }
        body, html, #root { height: 100%; background-color: #f3f4f6; }
        .min-h-screen { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .card {
          width: 100%;
          max-width: 400px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          padding: 32px;
        }
        .title {
          font-size: 28px;
          font-weight: 700;
          text-align: center;
          color: #1f2937;
          margin-bottom: 24px;
        }
        .label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 6px;
          display: block;
        }
        .input {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 12px;
          font-size: 14px;
          margin-bottom: 18px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.3);
        }
        .btn {
          width: 100%;
          background: #2563eb;
          color: white;
          font-weight: 600;
          padding: 10px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-size: 16px;
          transition: background 0.2s;
        }
        .btn:hover { background: #1d4ed8; }
        .forgot {
          display: block;
          text-align: center;
          margin-top: 16px;
          font-size: 14px;
          color: #2563eb;
          background: none;
          border: none;
          cursor: pointer;
        }
        .forgot:hover { text-decoration: underline; }
      `}</style>

      <div className="min-h-screen">
        <div className="card">
          <h2 className="title">Login</h2>

          <form onSubmit={handleLogin}>
            <label htmlFor="username" className="label">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              placeholder="Enter your Username"
              required
            />

            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter your password"
              required
            />

            <button type="submit" className="btn">Login</button>
          </form>

          <button className="forgot">Forgot Password?</button>
        </div>
      </div>
    </>
  );
}
