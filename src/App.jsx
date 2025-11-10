import { useState } from "react";

function App() {
  const [sentence, setSentence] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!sentence.trim()) return alert("Please enter a sentence!");

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentence }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
      <div className="bg-white text-gray-900 rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Sentiment Analyzer</h1>

        <textarea
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          placeholder="Type a sentence..."
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          rows={4}
        />

        <button
          onClick={handleAnalyze}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
        >
          {loading ? "Analyzing..." : "Analyze Sentiment"}
        </button>

        {result && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold">Result:</h2>
            <p className="mt-2 text-lg">
              <span className="font-bold text-blue-600">{result.sentiment}</span>
            </p>

            <div className="mt-4 bg-gray-100 p-4 rounded-md text-left">
              <p>Positive: {(result.scores.pos * 100).toFixed(2)}%</p>
              <p>Neutral: {(result.scores.neu * 100).toFixed(2)}%</p>
              <p>Negative: {(result.scores.neg * 100).toFixed(2)}%</p>
              <p className="text-gray-500 text-sm mt-2">
                Compound: {result.scores.compound}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
