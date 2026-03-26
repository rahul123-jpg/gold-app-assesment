  import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [charity,setCharity] = useState("");
  const [charityPercent,setCharityPercent] = useState(10);

  const nav = useNavigate();

  const handleSignup = async () => {
     if (!name || !email || !password || !charity) {
    alert("All fields are required");
    return;
  }

  if (!email.includes("@")) {
    alert("Enter valid email");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  if (charity === "Select Charity") {
    alert("Please select a charity");
    return;
  }

  if (charityPercent < 10) {
    alert("Minimum charity % is 10");
    return;
  }
    try {
      const res = await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
        charity,
        charityPercent,
      });
    
      alert(res.data.msg);
      nav("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        
        <h1 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-200"
        >
          Signup
        </button>

          <input 
  type="number" 
  placeholder="Charity % (min 10)" 
  value={charityPercent}
  onChange={(e)=>setCharityPercent(e.target.value)}
  className="border m-2"
/>

          <select 
  onChange={(e)=>setCharity(e.target.value)} 
  className="border m-2"
>
  <option>Select Charity</option>
  <option>Education Fund</option>
  <option>Health Support</option>
  <option>Food Donation</option>
</select>


        <p
          onClick={() => nav("/login")}
          className="text-center text-blue-500 cursor-pointer mt-4 hover:underline"
        >
          Already have an account? Login
        </p>

      </div>
    </div>
  );
}

export default Signup;