"use client";

import { useEffect, useRef } from "react";

export default function TradingChart({ symbol }: { symbol: string }) {

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!container.current) return;

    const script = document.createElement("script");

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

    script.type = "text/javascript";

    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol || "NASDAQ:AAPL",
      interval: "D",
      timezone: "Asia/Kolkata",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: true,
      studies: [
        "RSI@tv-basicstudies",
        "MACD@tv-basicstudies"
      ]
    });

    container.current.appendChild(script);

  }, []);

  return (
    <div className="w-full h-[700px] rounded-2xl overflow-hidden">
      <div
        className="tradingview-widget-container"
        ref={container}
      />
    </div>
  );
}