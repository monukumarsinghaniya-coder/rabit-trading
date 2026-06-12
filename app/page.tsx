"use client";

import { useState } from "react";
import TradingChart from "@/components/TradingChart";

export default function Home() {
  const [stock, setStock] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeStock = async () => {
    if (!stock) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/stock?symbol=${stock}`);

      const result = await res.json();

      setData(result);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch stock data");
    }

    setLoading(false);
  };

  const formatMarketCap = (value: number) => {
    if (!value) return "N/A";

    if (value >= 1000000000000)
      return `₹ ${(value / 1000000000000).toFixed(2)} Lakh Cr`;

    if (value >= 10000000)
      return `₹ ${(value / 10000000).toFixed(2)} Cr`;

    return value.toLocaleString();
  };

  const intradaySignal =
    data?.price > data?.low ? "BUY" : "SELL";

  const swingSignal =
    data?.pe < 20 ? "BUY" : "HOLD";

  const longTermSignal =
    data?.pe < 25 ? "STRONG BUY" : "HOLD";
  const aiScore = data
  ? Math.max(
      40,
      Math.min(
        95,
        (data.pe < 20 ? 30 : 15) +
          (data.price > data.low ? 30 : 10) +
          25
      )
    )
  : 0;

const targetPrice = data
  ? (Number(data.price) * 1.12).toFixed(2)
  : "-";

const stopLoss = data
  ? (Number(data.price) * 0.95).toFixed(2)
  : "-";
  return (
    <main className="min-h-screen bg-[#0b1120] text-white">
      <nav className="flex justify-between items-center px-8 py-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-blue-400">
          Rabit Trading
        </h1>

        <div className="flex gap-6 text-slate-300">
          <button>Dashboard</button>
          <button>Markets</button>
          <button>Portfolio</button>
          <button>AI Assistant</button>
        </div>
      </nav>

      <section className="p-8">
        <h2 className="text-5xl font-bold mb-4">
          AI Powered Stock Analysis
        </h2>

        <p className="text-slate-400 mb-8 text-xl">
          Intraday • Swing • Long Term Investing
        </p>

        <div className="flex gap-4 mb-10">
          <input
            type="text"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") analyzeStock();
            }}
            placeholder="Search stock like RELIANCE..."
            className="bg-slate-900 p-4 rounded-xl w-full max-w-xl"
          />

          <button
            onClick={analyzeStock}
            disabled={loading}
            className="bg-blue-500 px-8 rounded-xl py-4 hover:bg-blue-600 transition"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-slate-400 mb-2">
              Intraday Signal
            </h3>

            <p
              className={`text-3xl font-bold ${
                intradaySignal === "BUY"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {intradaySignal}
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-slate-400 mb-2">
              Swing Trade
            </h3>

            <p
              className={`text-3xl font-bold ${
                swingSignal === "BUY"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}
            >
              {swingSignal}
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-slate-400 mb-2">
              Long Term
            </h3>

            <p className="text-3xl font-bold text-blue-400">
              {longTermSignal}
            </p>
          </div>
        </div>

        <TradingChart symbol={stock} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 mt-8">
          {data && (
            <div className="bg-slate-900 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">
                Stock Details
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-slate-400">Company</p>
                  <h3 className="text-lg font-bold">
                    {data.name}
                  </h3>
                </div>

                <div>
                  <p className="text-slate-400">Symbol</p>
                  <h3 className="text-xl font-bold">
                    {data.symbol}
                  </h3>
                </div>

                <div>
                  <p className="text-slate-400">Price</p>
                  <h3 className="text-xl font-bold text-green-400">
                    ₹ {data.price}
                  </h3>
                </div>

                <div>
                  <p className="text-slate-400">Day High</p>
                  <h3 className="text-xl font-bold">
                    ₹ {data.high}
                  </h3>
                </div>

                <div>
                  <p className="text-slate-400">Day Low</p>
                  <h3 className="text-xl font-bold">
                    ₹ {data.low}
                  </h3>
                </div>

                <div>
                  <p className="text-slate-400">Volume</p>
                  <h3 className="text-xl font-bold">
                    {data.volume}
                  </h3>
                </div>

                <div>
                  <p className="text-slate-400">Market Cap</p>
                  <h3 className="text-xl font-bold">
                    {formatMarketCap(data.marketCap)}
                  </h3>
                </div>

                <div>
                  <p className="text-slate-400">PE Ratio</p>
                  <h3 className="text-xl font-bold">
                    {data.pe}
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">
              Company Overview
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">
                  Company
                </span>

                <span>{data?.name || "-"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Stock Price
                </span>

                <span className="text-green-400">
                  ₹ {data?.price || "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Market Cap
                </span>

                <span>
                  {formatMarketCap(data?.marketCap)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">
                  PE Ratio
                </span>

                <span>{data?.pe || "-"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Risk Level
                </span>

                <span
                  className={
                    data?.pe < 20
                      ? "text-green-400"
                      : data?.pe < 35
                      ? "text-yellow-400"
                      : "text-red-400"
                  }
                >
                  {data?.pe < 20
                    ? "Low"
                    : data?.pe < 35
                    ? "Medium"
                    : "High"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-purple-400">
              AI Prediction
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">
                  Intraday
                </span>

                <span
                  className={`font-bold ${
                    intradaySignal === "BUY"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {intradaySignal}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Swing Trade
                </span>

                <span className="text-yellow-400 font-bold">
                  {swingSignal}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Long Term
                </span>

                <span className="text-blue-400 font-bold">
                  {longTermSignal}
                </span>
              </div>

              <div className="mt-6 space-y-4">

  <div className="flex justify-between">
    <span className="text-slate-400">
      AI Score
    </span>

    <span className="font-bold text-green-400">
      {aiScore}/100
    </span>
  </div>

  <div className="flex justify-between">
    <span className="text-slate-400">
      Target Price
    </span>

    <span className="font-bold text-blue-400">
      ₹ {targetPrice}
    </span>
  </div>

  <div className="flex justify-between">
    <span className="text-slate-400">
      Stop Loss
    </span>

    <span className="font-bold text-red-400">
      ₹ {stopLoss}
    </span>
  </div>

  <p className="text-slate-300 leading-7 border-t border-slate-700 pt-4">
    AI recommendation is generated using PE Ratio,
    price action, volume strength and trend analysis.
  </p>

</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}