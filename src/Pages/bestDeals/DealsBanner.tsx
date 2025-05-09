import { useEffect, useState } from "react";

const DealsBanner = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour = 3600 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds:number) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="bg-gradient-to-r from-[]#4C765E to-red-500 text-white p-10  mt-10 text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-4">🔥 Mega Book Sale!</h2>
      <p className="text-xl md:text-2xl mb-6">Up to 50% off this week – Buy 2 Get 1 Free!</p>

      <div className="bg-black bg-opacity-30 inline-block px-6 py-3 rounded-full text-lg font-semibold tracking-widest">
        ⏳ Offer ends in: <span className="font-mono">{formatTime(timeLeft)}</span>
      </div>
    </div>
  );
};

export default DealsBanner;
