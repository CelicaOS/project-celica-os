import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import logoImage from "@assets/VirtuPay_(3)_1767521033473.png";

const welcomeMessage = `
+--------------------------------------+
|                                      |
|   CELICA INTELLIGENCE TERMINAL       |
|   v1.0.0                             |
|                                      |
|   High-End Analysis Engine           |
|   Powered by ElizaOS                 |
|                                      |
+--------------------------------------+

Type 'help' for available commands.
`;

const helpText = `
+--------------------------------------+
|  CELICA INTELLIGENCE TERMINAL v1.0   |
+--------------------------------------+
|  Powered by ElizaOS                  |
+--------------------------------------+

MARKET ANALYSIS
---------------
trending        Trending tokens
newpairs        Recently launched
sol             SOL price & info

TOKEN INTELLIGENCE
------------------
scan <CA>       Advanced scan
analyze <CA>    Basic analysis

AI INTELLIGENCE
---------------
ask "<question>"
  AI-powered analysis

UTILITIES
---------
status          System status
about           About Celica
clear           Clear terminal
help            Show this menu

Example:
> scan DuMbhu7m...LiZA
> ask "is this safe?"
`;

const aboutText = `
+--------------------------------------+
|         ABOUT CELICA                 |
+--------------------------------------+

CELICA is your on-chain companion,
built on the ElizaOS framework.

Features:
- Real-time market analysis
- Token intelligence scanning
- AI-powered insights
- DeFi integration

Version: 1.0.0
Framework: ElizaOS
Status: BETA
`;


async function fetchTerminalData(endpoint: string): Promise<string> {
  try {
    const response = await fetch(`/api/terminal/${endpoint}`);
    const data = await response.json();
    return data.data || "\n[ERROR] No data received.\n";
  } catch {
    return `\n[ERROR] Failed to fetch ${endpoint}.\nTry again later.\n`;
  }
}

async function fetchScanData(address: string): Promise<string> {
  try {
    const response = await fetch("/api/terminal/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    });
    const data = await response.json();
    return data.data || "\n[ERROR] Scan failed.\n";
  } catch {
    return "\n[ERROR] Failed to scan token.\nCheck address and try again.\n";
  }
}


async function fetchAIResponse(question: string, context?: string): Promise<string> {
  try {
    const response = await fetch("/api/terminal/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, context }),
    });
    
    if (!response.ok) {
      throw new Error("AI service error");
    }
    
    const data = await response.json();
    return `
+--------------------------------------+
|      AI ANALYSIS                     |
+--------------------------------------+

Q: "${question}"

${data.answer}

[!] Always DYOR
`;
  } catch {
    return `
+--------------------------------------+
|      AI ANALYSIS                     |
+--------------------------------------+

[ERROR] AI service unavailable.
Please try again later.

You can still use other commands:
- trending, newpairs, sol
- scan <CA>, analyze <CA>
`;
  }
}

interface TerminalLine {
  type: "input" | "output";
  content: string;
}

export default function TerminalPage() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: welcomeMessage }
  ]);
  const [input, setInput] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const lowerCmd = trimmedCmd.toLowerCase();
    
    setLines((prev) => [...prev, { type: "input", content: `> ${cmd}` }]);
    
    if (lowerCmd === "clear") {
      setLines([{ type: "output", content: welcomeMessage }]);
      return;
    }
    
    if (lowerCmd === "help") {
      setLines((prev) => [...prev, { type: "output", content: helpText }]);
      return;
    }
    
    if (lowerCmd === "about") {
      setLines((prev) => [...prev, { type: "output", content: aboutText }]);
      return;
    }
    
    if (lowerCmd === "status") {
      setIsProcessing(true);
      setLines((prev) => [...prev, { type: "output", content: "\nChecking live system status..." }]);
      const statusData = await fetchTerminalData("status");
      setLines((prev) => [...prev.slice(0, -1), { type: "output", content: statusData }]);
      setIsProcessing(false);
      return;
    }
    
    if (lowerCmd === "trending") {
      setIsProcessing(true);
      setLines((prev) => [...prev, { type: "output", content: "\nFetching live trending tokens..." }]);
      const trendingData = await fetchTerminalData("trending");
      setLines((prev) => [...prev.slice(0, -1), { type: "output", content: trendingData }]);
      setIsProcessing(false);
      return;
    }
    
    if (lowerCmd === "newpairs") {
      setIsProcessing(true);
      setLines((prev) => [...prev, { type: "output", content: "\nFetching live new pairs..." }]);
      const newpairsData = await fetchTerminalData("newpairs");
      setLines((prev) => [...prev.slice(0, -1), { type: "output", content: newpairsData }]);
      setIsProcessing(false);
      return;
    }
    
    if (lowerCmd === "sol") {
      setIsProcessing(true);
      setLines((prev) => [...prev, { type: "output", content: "\nFetching live SOL data..." }]);
      const solData = await fetchTerminalData("sol");
      setLines((prev) => [...prev.slice(0, -1), { type: "output", content: solData }]);
      setIsProcessing(false);
      return;
    }
    
    if (lowerCmd === "date") {
      const now = new Date();
      setLines((prev) => [...prev, { type: "output", content: `\n${now.toLocaleString()}\n` }]);
      return;
    }
    
    if (lowerCmd.startsWith("scan ")) {
      const ca = trimmedCmd.slice(5).trim();
      if (!ca) {
        setLines((prev) => [...prev, { type: "output", content: "\n[ERROR] Usage: scan <CA>\n" }]);
        return;
      }
      setIsProcessing(true);
      setLines((prev) => [...prev, { type: "output", content: `\nScanning ${ca.slice(0, 8)}... (Live API + AI)` }]);
      const scanData = await fetchScanData(ca);
      setLines((prev) => [...prev.slice(0, -1), { type: "output", content: scanData }]);
      setIsProcessing(false);
      return;
    }
    
    if (lowerCmd.startsWith("analyze ")) {
      const ca = trimmedCmd.slice(8).trim();
      if (!ca) {
        setLines((prev) => [...prev, { type: "output", content: "\n[ERROR] Usage: analyze <CA>\n" }]);
        return;
      }
      setIsProcessing(true);
      setLines((prev) => [...prev, { type: "output", content: `\nAnalyzing ${ca.slice(0, 8)}... (Live API + AI)` }]);
      const analyzeData = await fetchScanData(ca);
      setLines((prev) => [...prev.slice(0, -1), { type: "output", content: analyzeData }]);
      setIsProcessing(false);
      return;
    }
    
    if (lowerCmd.startsWith("ask ")) {
      const questionPart = trimmedCmd.slice(4).trim();
      const match = questionPart.match(/^["'](.+?)["']\s*(.*)$/);
      const question = match ? match[1] : questionPart.replace(/^["']|["']$/g, '');
      const context = match ? match[2].trim() : undefined;
      
      if (!question) {
        setLines((prev) => [...prev, { type: "output", content: '\n[ERROR] Usage: ask "<question>"\n' }]);
        return;
      }
      
      setIsProcessing(true);
      setLines((prev) => [...prev, { type: "output", content: "\nConnecting to AI..." }]);
      const aiResponse = await fetchAIResponse(question, context);
      setLines((prev) => [...prev.slice(0, -1), { type: "output", content: aiResponse }]);
      setIsProcessing(false);
      return;
    }
    
    if (trimmedCmd) {
      setLines((prev) => [...prev, { 
        type: "output", 
        content: `\nCommand not found: '${trimmedCmd}'\nType 'help' for commands.\n` 
      }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      handleCommand(input);
      setInput("");
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-black text-primary flex flex-col" onClick={focusInput}>
      <div className="flex items-center justify-between p-2 md:p-4 border-b-4 border-primary/30">
        <Link href="/os">
          <a 
            className="flex items-center gap-2 px-3 py-1 border-2 border-primary/50 text-[10px] hover:bg-primary/10 transition-colors"
            data-testid="link-back-os"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>BACK</span>
          </a>
        </Link>
        
        <div className="flex items-center gap-2">
          <img src={logoImage} alt="CELICA" className="w-6 h-6 pixelated" />
          <span className="text-[10px] md:text-xs">CELICA TERMINAL</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 ${isProcessing ? 'bg-yellow-500 animate-pulse' : 'bg-primary blink-indicator'}`} />
          <span className="text-[8px]">{isProcessing ? 'BUSY' : 'READY'}</span>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-[9px] md:text-[11px] leading-relaxed"
        style={{ fontFamily: "'Press Start 2P', monospace" }}
      >
        {lines.map((line, index) => (
          <pre 
            key={index} 
            className={`whitespace-pre-wrap break-all ${
              line.type === "input" ? "text-white" : "text-primary"
            }`}
          >
            {line.content}
          </pre>
        ))}
        
        <div className="flex items-center mt-2">
          <span className="text-white mr-2">&gt;</span>
          <form onSubmit={handleSubmit} className="flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white caret-transparent"
              autoFocus
              disabled={isProcessing}
              data-testid="input-terminal"
            />
            <span 
              className={`w-2 h-4 bg-primary ${cursorVisible && !isProcessing ? "opacity-100" : "opacity-0"}`}
              style={{ marginLeft: "-2px" }}
            />
          </form>
        </div>
      </div>
      
      <div className="p-2 border-t-4 border-primary/30 flex items-center justify-between text-[8px]">
        <span>v1.0.0</span>
        <div className="flex items-center gap-4">
          <span>MEM: 60%</span>
          <span>CPU: 80%</span>
          <span className="flicker-text">{isProcessing ? 'PROCESSING...' : 'READY'}</span>
        </div>
        <span>ElizaOS</span>
      </div>
      
      <div className="absolute inset-0 pointer-events-none crt-scan opacity-30" />
    </div>
  );
}
