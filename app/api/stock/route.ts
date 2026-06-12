import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get("symbol");

    if (!symbol) {
      return NextResponse.json(
        { error: "Symbol required" },
        { status: 400 }
      );
    }

    const quote: any = await yahooFinance.quote(
      `${symbol.toUpperCase()}.NS`
    );

    return NextResponse.json({
      symbol: quote.symbol,
      name:
        quote.longName ||
        quote.shortName ||
        symbol,
      price: quote.regularMarketPrice,
      high: quote.regularMarketDayHigh,
      low: quote.regularMarketDayLow,
      volume: quote.regularMarketVolume,
      marketCap: quote.marketCap,
      pe: quote.trailingPE,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error?.message || "Stock not found",
      },
      { status: 500 }
    );
  }
}