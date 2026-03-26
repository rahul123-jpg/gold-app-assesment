import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [score, setScore] = useState("");
  const [scores, setScores] = useState([]);
  const [draw, setDraw] = useState([]);
  const [result, setResult] = useState("");
  const [user,setUser] = useState(null);
   const nav = useNavigate();
  const userId = localStorage.getItem("userId");

  const addScore = async () => {
    if (!score) return;

    const res = await axios.post("http://localhost:5000/add-score", {
      userId,
      value: score,
      date: new Date().toLocaleDateString(),
    });

    setScores(res.data);
    setScore("");
  };

  const getScores = async () => {
    const res = await axios.get(`http://localhost:5000/scores/${userId}`);
    setScores(res.data);
  };

  const runDraw = async () => {
    const res = await axios.get("http://localhost:5000/draw");
    setDraw(res.data);

    let userScores = scores.map((s) => Number(s.value));
    let match = userScores.filter((s) => res.data.includes(s)).length;

    if (match === 5) setResult("JACKPOT 🤑");
    else if (match === 4) setResult("Great 🎉");
    else if (match === 3) setResult("Good 👍");
    else setResult("No Luck 😢");
  };


  const getUser = async ()=>{
    const res = await axios.get(`http://localhost:5000/user/${userId}`);
    setUser(res.data);
};


  useEffect(() => {
    getUser()
    getScores();
  }, []);

  return (
<div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6">
{/* Charity Info Card */}
<div className="w-full max-w-3xl bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-xl mb-4 shadow-sm border">
  <h2 className="text-xl font-semibold mb-2 text-gray-700">
     Your Charity Contribution
  </h2>

  <div className="flex justify-between items-center">
    <div>
      <p className="text-gray-600 text-sm">Selected Charity</p>
      <p className="text-lg font-bold text-green-700">
        {user?.charity || "Not Selected"}
      </p>
    </div>

    <div className="text-right">
      <p className="text-gray-600 text-sm">Contribution</p>
      <p className="text-lg font-bold text-blue-700">
        {user?.charityPercent || 0}%
      </p>
    </div>
  </div>
</div>

      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6"> Dashboard</h1>

        {/* Add Score */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="Enter score"
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addScore}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
>
            Add
          </button>
        </div>

        {/* Scores List */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Your Scores</h2>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {scores.length === 0 ? (
              <p className="text-gray-500">No scores added yet</p>
            ) : (
              scores.map((s, i) => (
                <div
                  key={i}
                  className="flex justify-between bg-gray-50 p-2 rounded-lg border"
                >
                  <span className="font-medium">{s.value}</span>
                  <span className="text-sm text-gray-500">{s.date}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Draw Section */}
        <div className="mb-6  text-center">
          <button
            onClick={runDraw}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg mr-4"
          >
            Run Draw 
          </button>

          <button 
  onClick={()=>nav("/admin")} 
  className="bg-black text-white p-2 mt-3 sm:mt-2 w-full sm:w-auto "
>

  Go to Admin Panel
</button>

        </div>

        {/* Draw Numbers */}
        {draw.length > 0 && (
          <div className="mb-6 text-center flex flex-col sm:flex-row justify-center gap-3">
            <h2 className="text-lg font-semibold mb-2">Draw Numbers</h2>
            <div className="flex justify-center flex-wrap gap-2">
              {draw.map((d, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold"
                >
                  {d}
                </span>
              ))}
              
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">{result}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
