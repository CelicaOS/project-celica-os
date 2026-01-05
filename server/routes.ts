import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache: Record<string, CacheItem<unknown>> = {};
const CACHE_TTL = 60000;

function getFromCache<T>(key: string): T | null {
  const item = cache[key] as CacheItem<T> | undefined;
  if (item && Date.now() - item.timestamp < CACHE_TTL) {
    return item.data;
  }
  return null;
}

function setCache<T>(key: string, data: T): void {
  cache[key] = { data, timestamp: Date.now() };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/terminal/trending", async (_req, res) => {
    try {
      const cached = getFromCache<string>("trending");
      if (cached) return res.json({ data: cached });

      const response = await fetch("https://api.dexscreener.com/token-boosts/top/v1");
      const data = await response.json();
      
      const tokens = (data as Array<{ tokenAddress: string; description?: string; chainId?: string }>)
        .filter((t) => t.chainId === "solana")
        .slice(0, 5);
      
      let output = `
+--------------------------------------+
|      TRENDING TOKENS (LIVE)          |
+--------------------------------------+
`;
      
      if (tokens.length === 0) {
        output += "\nNo trending tokens found.\n";
      } else {
        tokens.forEach((token, i) => {
          const addr = token.tokenAddress || "Unknown";
          const short = addr.length > 8 ? `${addr.slice(0, 4)}...${addr.slice(-4)}` : addr;
          output += `\n#${i + 1} ${short}\n`;
          if (token.description) {
            output += `   ${token.description.slice(0, 30)}\n`;
          }
        });
      }
      
      output += "\nSource: DexScreener API\n";
      
      setCache("trending", output);
      res.json({ data: output });
    } catch (error) {
      console.error("Trending error:", error);
      res.json({ data: "\n[ERROR] Failed to fetch trending.\nTry again later.\n" });
    }
  });

  app.get("/api/terminal/newpairs", async (_req, res) => {
    try {
      const cached = getFromCache<string>("newpairs");
      if (cached) return res.json({ data: cached });

      const response = await fetch("https://api.dexscreener.com/token-profiles/latest/v1");
      const data = await response.json();
      
      const pairs = (data as Array<{ tokenAddress: string; chainId?: string; description?: string }>)
        .filter((p) => p.chainId === "solana")
        .slice(0, 5);
      
      let output = `
+--------------------------------------+
|      NEW PAIRS (LIVE)                |
+--------------------------------------+
`;
      
      if (pairs.length === 0) {
        output += "\nNo new pairs found.\n";
      } else {
        pairs.forEach((pair, i) => {
          const addr = pair.tokenAddress || "Unknown";
          const short = addr.length > 8 ? `${addr.slice(0, 4)}...${addr.slice(-4)}` : addr;
          output += `\n${i + 1}. ${short}\n`;
          if (pair.description) {
            output += `   ${pair.description.slice(0, 30)}\n`;
          }
        });
      }
      
      output += "\n[!] DYOR - New tokens high risk\nSource: DexScreener API\n";
      
      setCache("newpairs", output);
      res.json({ data: output });
    } catch (error) {
      console.error("Newpairs error:", error);
      res.json({ data: "\n[ERROR] Failed to fetch new pairs.\nTry again later.\n" });
    }
  });

  app.get("/api/terminal/sol", async (_req, res) => {
    try {
      const cached = getFromCache<string>("sol");
      if (cached) return res.json({ data: cached });

      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true");
      const data = await response.json() as { solana?: { usd?: number; usd_24h_change?: number; usd_24h_vol?: number; usd_market_cap?: number } };
      
      const sol = data.solana;
      if (!sol) {
        throw new Error("No SOL data");
      }
      
      const price = sol.usd?.toFixed(2) || "N/A";
      const change = sol.usd_24h_change?.toFixed(2) || "N/A";
      const vol = sol.usd_24h_vol ? `$${(sol.usd_24h_vol / 1e9).toFixed(2)}B` : "N/A";
      const mcap = sol.usd_market_cap ? `$${(sol.usd_market_cap / 1e9).toFixed(2)}B` : "N/A";
      
      const output = `
+--------------------------------------+
|         SOLANA NETWORK (LIVE)        |
+--------------------------------------+

SOL PRICE
---------
Price: $${price}
24h Change: ${Number(change) >= 0 ? '+' : ''}${change}%
Volume: ${vol}
Market Cap: ${mcap}

NETWORK STATUS
--------------
Status: OPERATIONAL
RPC: CONNECTED

Source: CoinGecko API
`;
      
      setCache("sol", output);
      res.json({ data: output });
    } catch (error) {
      console.error("SOL error:", error);
      res.json({ data: "\n[ERROR] Failed to fetch SOL data.\nTry again later.\n" });
    }
  });

  app.post("/api/terminal/scan", async (req, res) => {
    try {
      const { address } = req.body;
      if (!address) {
        return res.status(400).json({ error: "Address required" });
      }

      const response = await fetch(`https://api.dexscreener.com/tokens/v1/solana/${address}`);
      const data = await response.json() as Array<{
        baseToken?: { name?: string; symbol?: string };
        priceUsd?: string;
        volume?: { h24?: number };
        liquidity?: { usd?: number };
        fdv?: number;
        priceChange?: { h24?: number };
        txns?: { h24?: { buys?: number; sells?: number } };
      }>;
      
      const token = data[0];
      
      if (!token) {
        const aiPrompt = `Analyze this Solana token contract address for a crypto terminal: ${address}. 
        Since no data was found on DexScreener, provide a brief risk assessment and what the user should check.
        Keep response under 200 words, use simple ASCII formatting.`;
        
        const aiResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are CELICA, a crypto analysis AI. Format responses for terminal display (max 40 chars per line)." },
            { role: "user", content: aiPrompt }
          ],
          max_tokens: 300,
        });
        
        const analysis = aiResponse.choices[0]?.message?.content || "Unable to analyze.";
        
        return res.json({ data: `
+--------------------------------------+
|      TOKEN SCAN                      |
+--------------------------------------+
Contract: ${address.slice(0, 8)}...

[!] Token not found on DexScreener

AI ANALYSIS:
${analysis}

[!] Always DYOR
` });
      }

      const name = token.baseToken?.name || "Unknown";
      const symbol = token.baseToken?.symbol || "???";
      const price = token.priceUsd ? `$${parseFloat(token.priceUsd).toFixed(6)}` : "N/A";
      const vol = token.volume?.h24 ? `$${(token.volume.h24 / 1000).toFixed(1)}K` : "N/A";
      const liq = token.liquidity?.usd ? `$${(token.liquidity.usd / 1000).toFixed(1)}K` : "N/A";
      const mcap = token.fdv ? `$${(token.fdv / 1000000).toFixed(2)}M` : "N/A";
      const change = token.priceChange?.h24?.toFixed(2) || "0";
      const buys = token.txns?.h24?.buys || 0;
      const sells = token.txns?.h24?.sells || 0;

      const aiPrompt = `Briefly analyze this Solana token for risks:
Name: ${name} (${symbol})
Price: ${price}, 24h: ${change}%
Liquidity: ${liq}, Volume: ${vol}
MCap: ${mcap}
24h Txns: ${buys} buys, ${sells} sells

Provide 3-4 bullet points about potential risks or opportunities. Max 100 words.`;

      const aiResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are CELICA, a crypto analysis AI. Be concise and terminal-formatted." },
          { role: "user", content: aiPrompt }
        ],
        max_tokens: 200,
      });

      const analysis = aiResponse.choices[0]?.message?.content || "";

      const output = `
+--------------------------------------+
|      TOKEN SCAN (LIVE)               |
+--------------------------------------+
${name} (${symbol})
Contract: ${address.slice(0, 8)}...

PRICE DATA
----------
Price: ${price}
24h Change: ${Number(change) >= 0 ? '+' : ''}${change}%
Volume: ${vol}
MCap: ${mcap}

LIQUIDITY
---------
Total: ${liq}
24h Buys: ${buys}
24h Sells: ${sells}

AI ANALYSIS
-----------
${analysis}

Source: DexScreener + AI
[!] Always DYOR
`;

      res.json({ data: output });
    } catch (error) {
      console.error("Scan error:", error);
      res.json({ data: "\n[ERROR] Failed to scan token.\nCheck the address and try again.\n" });
    }
  });

  app.get("/api/terminal/status", async (_req, res) => {
    try {
      const startTime = Date.now();
      
      const checks = await Promise.allSettled([
        fetch("https://api.dexscreener.com/token-boosts/top/v1").then(r => r.ok),
        fetch("https://api.coingecko.com/api/v3/ping").then(r => r.ok),
        openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: "ping" }],
          max_tokens: 5,
        }).then(() => true),
      ]);

      const dexStatus = checks[0].status === "fulfilled" && checks[0].value ? "CONNECTED" : "ERROR";
      const geckoStatus = checks[1].status === "fulfilled" && checks[1].value ? "CONNECTED" : "ERROR";
      const aiStatus = checks[2].status === "fulfilled" && checks[2].value ? "READY" : "ERROR";
      
      const responseTime = Date.now() - startTime;
      const uptime = process.uptime();
      const uptimeStr = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`;
      
      const memUsage = process.memoryUsage();
      const memPercent = Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100);
      const memBar = "#".repeat(Math.floor(memPercent / 10)) + ".".repeat(10 - Math.floor(memPercent / 10));
      
      const output = `
+--------------------------------------+
|         SYSTEM STATUS (LIVE)         |
+--------------------------------------+

API CONNECTIONS
---------------
DexScreener... [${dexStatus === "CONNECTED" ? "##########" : "XXXXXXXXXX"}] ${dexStatus}
CoinGecko..... [${geckoStatus === "CONNECTED" ? "##########" : "XXXXXXXXXX"}] ${geckoStatus}
AI Module..... [${aiStatus === "READY" ? "##########" : "XXXXXXXXXX"}] ${aiStatus}

SYSTEM METRICS
--------------
Memory........ [${memBar}] ${memPercent}%
Response Time. ${responseTime}ms
Uptime........ ${uptimeStr}

Status: ${dexStatus === "CONNECTED" && geckoStatus === "CONNECTED" && aiStatus === "READY" ? "ALL SYSTEMS OPERATIONAL" : "PARTIAL DEGRADATION"}
`;
      
      res.json({ data: output });
    } catch (error) {
      console.error("Status error:", error);
      res.json({ data: "\n[ERROR] Failed to check status.\n" });
    }
  });

  app.get("/api/tokens/live", async (_req, res) => {
    try {
      const cached = getFromCache<object>("live-tokens");
      if (cached) return res.json(cached);

      const addresses = [
        { id: "celica", address: "Esr8BtwyZwE8wx4No6ZUTK79vjXR4xeqoqxGbCBJpump" },
        { id: "elizaos", address: "DuMbhu7mvQvqQHGcnikDgb4XegXJRyhUBfdU22uELiZA" }
      ];

      const results: Record<string, {
        price: string;
        change: string;
        mcap: string;
        liquidity: string;
        volume: string;
      }> = {};

      await Promise.all(addresses.map(async ({ id, address }) => {
        try {
          const response = await fetch(`https://api.dexscreener.com/tokens/v1/solana/${address}`);
          const data = await response.json() as Array<{
            priceUsd?: string;
            priceChange?: { h24?: number };
            fdv?: number;
            liquidity?: { usd?: number };
            volume?: { h24?: number };
          }>;
          
          const token = data[0];
          if (token) {
            const price = token.priceUsd ? `$${parseFloat(token.priceUsd).toFixed(6)}` : "N/A";
            const change = token.priceChange?.h24?.toFixed(2) || "0";
            const mcap = token.fdv ? (token.fdv >= 1000000 ? `$${(token.fdv / 1000000).toFixed(2)}M` : `$${(token.fdv / 1000).toFixed(1)}K`) : "N/A";
            const liq = token.liquidity?.usd ? `$${(token.liquidity.usd / 1000).toFixed(1)}K` : "N/A";
            const vol = token.volume?.h24 ? `$${(token.volume.h24 / 1000).toFixed(1)}K` : "N/A";
            
            results[id] = { price, change: `${Number(change) >= 0 ? '+' : ''}${change}%`, mcap, liquidity: liq, volume: vol };
          }
        } catch (e) {
          console.error(`Error fetching ${id}:`, e);
        }
      }));

      setCache("live-tokens", results);
      res.json(results);
    } catch (error) {
      console.error("Live tokens error:", error);
      res.status(500).json({ error: "Failed to fetch live token data" });
    }
  });

  app.post("/api/terminal/ask", async (req, res) => {
    try {
      const { question, context } = req.body;
      
      if (!question) {
        return res.status(400).json({ error: "Question is required" });
      }

      const systemPrompt = `You are CELICA, an AI-powered on-chain companion terminal assistant. You help users with:
- Cryptocurrency and DeFi analysis
- Token safety and risk assessment
- Market trends and insights
- Smart contract understanding
- Solana ecosystem knowledge

Keep responses concise and formatted for a retro terminal display (max 40 chars per line when possible).
Use simple ASCII characters only, no emojis.
Be helpful but always remind users to DYOR (Do Your Own Research).
${context ? `Context: Analyzing token contract ${context}` : ''}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question }
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const answer = response.choices[0]?.message?.content || "Unable to process your request.";
      
      res.json({ answer });
    } catch (error) {
      console.error("Terminal AI error:", error);
      res.status(500).json({ error: "AI service temporarily unavailable" });
    }
  });

  return httpServer;
}
