import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleLogin = async () => {
      if (!email.includes("@")) {
    alert("Enter valid email");
    return;
  }
  if(!password){
    alert ("password required")
  }
    try {
      setLoading(true)
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (res.data.userId) {
        localStorage.setItem("userId", res.data.userId);
        nav("/dashboard");
      } else {
        alert(res.data.msg);
      }
    } catch (err) {
      alert("Login failed");
    
     } finally {
    setLoading(false);
     }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome Back
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
         className={`w-full py-2 rounded-lg text-white ${
    loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
  }`}
>
          {loading ? "Logging in..." : "Login"}
</button>

        <p
          onClick={() => nav("/")}
          className="text-center text-green-500 cursor-pointer mt-4 hover:underline"
        >
          Don't have an account? Signup
        </p>

      </div>
    </div>
  );
}

export default Login;