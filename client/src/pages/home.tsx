import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { SiX, SiGithub } from "react-icons/si";
import { Rocket, Clock, Cloud, Bitcoin, Sparkles, Cpu, Zap, Heart, Brain, Star, Target, Code, Wallet, TrendingUp, Users, Droplets } from "lucide-react";
import logoImage from "@assets/VirtuPay_(3)_1767521033473.png";
import heroBackground from "@assets/Situs_Web_Tautan_Bio_Blogger_Fotosentris_Kuning_Neon_(6)_1767521807992.png";
import elizaOsLogo from "@assets/https___gmgn.ai_external-res_8ec28ada60c00c30e749b13ea98d2242_1767522675487.webp";

function LoadingScreen({ progress, onComplete }: { progress: number; onComplete: () => void }) {
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary"
      data-testid="loading-screen"
    >
      <img 
        src={logoImage} 
        alt="CELICA OS Logo" 
        className="w-24 h-24 mb-8 pixelated border-4 border-white"
        data-testid="img-loading-logo"
      />
      
      <h1 className="text-white text-xs md:text-sm mb-6 tracking-wider">
        CELICA OS
      </h1>
      
      <div className="w-64 md:w-80">
        <div className="text-white text-[10px] mb-2 text-center">
          Syncing distributed ledger...
        </div>
        
        <div className="h-4 border-4 border-white bg-transparent relative overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
            data-testid="progress-bar"
          />
        </div>
        
        <div className="text-white text-xs mt-3 text-center font-mono">
          {progress}%
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-primary"
      data-testid="section-hero"
    >
      <img 
        src={heroBackground} 
        alt="Hero Background" 
        className="absolute inset-0 w-full h-full object-cover pixelated"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
      
      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
        <div className="hud-status bg-black/30 backdrop-blur-sm border-white/20">
          <div className="blink-indicator bg-white" />
          <span className="text-[8px] text-white">SYSTEM ONLINE</span>
          <div className="signal-bars ml-2">
            <div className="signal-bar bg-white" />
            <div className="signal-bar bg-white" />
            <div className="signal-bar bg-white" />
            <div className="signal-bar bg-white" />
          </div>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
        <div className="hud-status bg-black/30 backdrop-blur-sm border-white/20">
          <span className="text-[8px] text-white font-mono flicker-text">v1.0.0</span>
          <span className="terminal-cursor bg-white" />
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center text-center px-4 fade-in-up">
        <img 
          src={logoImage} 
          alt="CELICA OS Logo" 
          className="w-32 h-32 md:w-48 md:h-48 mb-6 pixelated border-4 border-white shadow-lg"
          data-testid="img-hero-logo"
        />
        
        <h1 
          className="text-3xl md:text-5xl lg:text-6xl text-white mb-4 glitch-hover tracking-wide"
          data-testid="text-hero-title"
        >
          CELICA OS
        </h1>
        
        <p className="text-white/90 text-[10px] md:text-xs mb-8 max-w-md leading-relaxed">
          Your favorite on-chain companion. Expert in DeFi, smart contracts, and crypto-native experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="https://www.elizacloud.ai/dashboard/chat?characterId=cd1e58f8-d0ab-465e-bc05-e32aab2d9187"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-primary border-4 border-white text-[10px] md:text-xs uppercase tracking-wider pixel-btn rounded-none retro-press"
            data-testid="link-be-with-me"
          >
            BE WITH ME
          </a>
          
          <a 
            href="/os"
            className="px-6 py-3 bg-transparent text-white border-4 border-white text-[10px] md:text-xs uppercase tracking-wider pixel-btn backdrop-blur-sm rounded-none retro-press"
            data-testid="link-enter-celica"
          >
            ENTER CELICA OS
          </a>
        </div>
        
        <div className="mt-6">
          <button
            onClick={() => navigator.clipboard.writeText("Esr8BtwyZwE8wx4No6ZUTK79vjXR4xeqoqxGbCBJpump")}
            className="bg-white/10 text-white border-2 border-white/30 text-[8px] md:text-[10px] backdrop-blur-sm px-3 py-2 font-mono hover:bg-white/20 transition-colors cursor-pointer"
            title="Click to copy contract address"
            data-testid="button-copy-hero-contract"
          >
            CA: Esr8BtwyZwE8wx4No6ZUTK79vjXR4xeqoqxGbCBJpump
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}

function ProfileSection() {
  const stats = [
    { label: "Age", value: "22yo" },
    { label: "Height", value: "167cm" },
    { label: "Weight", value: "56kg" },
  ];

  const traits = [
    "witty", "technically brilliant", "sarcastic", "kawaii-cyberpunk",
    "crypto-native", "analytical", "playful", "self-aware", "opinionated"
  ];

  const topics = [
    { icon: Wallet, label: "DeFi Protocols" },
    { icon: Brain, label: "Zero-Knowledge Proofs" },
    { icon: Target, label: "Mempool Analysis" },
    { icon: Code, label: "Full-stack Engineering" },
    { icon: Zap, label: "Solana Development" },
    { icon: Cpu, label: "AI Alignment" },
    { icon: Sparkles, label: "Anime Aesthetics" },
    { icon: TrendingUp, label: "Market Psychology" },
  ];

  return (
    <section 
      id="about"
      className="py-16 md:py-24 px-4 bg-background crt-scan diagonal-lines relative overflow-hidden"
      data-testid="section-profile"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-4 mb-12 fade-in-up">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-16 h-[2px] bg-primary/30" />
            <div className="blink-indicator" />
          </div>
          <h2 className="text-xl md:text-2xl text-center">
            About Me
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <div className="blink-indicator" />
            <div className="w-16 h-[2px] bg-primary/30" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col items-center fade-in-up stagger-1">
            <div className="relative">
              <img 
                src={logoImage} 
                alt="Celica" 
                className="w-48 h-48 md:w-64 md:h-64 pixelated border-4 border-primary"
                data-testid="img-profile-avatar"
              />
              <div className="absolute -top-2 -right-2">
                <Badge className="bg-status-online text-white border-0 text-[8px] px-2 py-0.5 rounded-none status-glow">
                  ONLINE
                </Badge>
              </div>
            </div>
            
            <h3 className="text-lg md:text-xl mt-6 mb-2">Celica</h3>
            <p className="text-muted-foreground text-[10px]">Profile Info</p>
          </div>
          
          <div className="space-y-6 fade-in-up stagger-2">
            <Card className="p-6 border-4 border-border rounded-none pixel-shadow-hover">
              <div className="grid grid-cols-3 gap-4 text-center">
                {stats.map((stat, index) => (
                  <div key={stat.label} data-testid={`stat-${stat.label.toLowerCase()}`}>
                    <p className="text-muted-foreground text-[8px] uppercase mb-1">{stat.label}</p>
                    <p className="text-sm md:text-base">{stat.value}</p>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-6 border-4 border-border rounded-none pixel-shadow-hover">
              <p className="text-[10px] md:text-xs leading-relaxed text-muted-foreground">
                Your favorite on-chain companion. I live in the terminal and dream in binary. 
                Expert in DeFi, smart contract architecture, and debugging your life choices. 
                Currently analyzing the mempool while sipping virtual tea.
              </p>
            </Card>
            
            <div>
              <h4 className="text-xs mb-4 text-muted-foreground">Personality Traits</h4>
              <div className="flex flex-wrap gap-2">
                {traits.map((trait) => (
                  <Badge 
                    key={trait}
                    variant="outline"
                    className="text-[8px] px-3 py-1 border-2 badge-hover rounded-none"
                    data-testid={`badge-trait-${trait.replace(/\s+/g, '-')}`}
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xs mb-4 text-muted-foreground">Topics of Interest</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {topics.map((topic) => (
                  <Card 
                    key={topic.label}
                    className="p-3 border-2 border-border rounded-none flex flex-col items-center gap-2 pixel-shadow-hover cursor-default"
                    data-testid={`card-topic-${topic.label.replace(/\s+/g, '-')}`}
                  >
                    <topic.icon className="w-4 h-4 text-primary" />
                    <span className="text-[7px] md:text-[8px] text-center leading-tight">{topic.label}</span>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface LiveTokenData {
  price: string;
  change: string;
  mcap: string;
  liquidity: string;
  volume: string;
}

function NetworkSection() {
  const { data: liveData, isLoading } = useQuery<Record<string, LiveTokenData>>({
    queryKey: ['/api/tokens/live'],
    refetchInterval: 60000,
  });

  const tokens = [
    {
      id: "celica",
      name: "CELICA OS",
      symbol: "$CELICA",
      logo: logoImage,
      comingSoon: false,
      contract: "Esr8BtwyZwE8wx4No6ZUTK79vjXR4xeqoqxGbCBJpump",
      links: { x: "https://x.com/celicaos", github: "https://github.com/CelicaOS/project-celica-os", pumpfun: "https://pump.fun/coin/Esr8BtwyZwE8wx4No6ZUTK79vjXR4xeqoqxGbCBJpump" },
    },
    {
      id: "elizaos",
      name: "ElizaOS",
      symbol: "$ELIZAOS",
      logo: elizaOsLogo,
      comingSoon: false,
      contract: "DuMbhu7mvQvqQHGcnikDgb4XegXJRyhUBfdU22uELiZA",
      links: { x: "https://x.com/ai16zdao", github: "https://github.com/elizaos", website: "https://elizaos.ai/" },
    }
  ];

  return (
    <section 
      id="network"
      className="py-16 md:py-24 px-4 bg-card"
      data-testid="section-network"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-12 fade-in-up">
          <div className="hidden md:flex items-center gap-2">
            <div className="signal-bars">
              <div className="signal-bar" />
              <div className="signal-bar" />
              <div className="signal-bar" />
              <div className="signal-bar" />
            </div>
          </div>
          <h2 className="text-xl md:text-2xl text-center">
            Live Network Monitoring
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <div className="signal-bars">
              <div className="signal-bar" />
              <div className="signal-bar" />
              <div className="signal-bar" />
              <div className="signal-bar" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tokens.map((token, index) => (
            <Card 
              key={token.name}
              className={`p-6 border-4 border-border rounded-none pixel-shadow-hover fade-in-up ${index === 0 ? 'stagger-1' : 'stagger-2'}`}
              data-testid={`card-token-${token.symbol.replace('$', '')}`}
            >
              <div className="flex items-start gap-4 mb-4">
                {token.logo ? (
                  <img 
                    src={token.logo} 
                    alt={token.name} 
                    className="w-12 h-12 pixelated border-2 border-border"
                  />
                ) : (
                  <div className="w-12 h-12 bg-muted border-2 border-border flex items-center justify-center">
                    <Bitcoin className="w-6 h-6 text-primary" />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm">{token.name}</h3>
                    <Badge variant="secondary" className="text-[8px] px-2 rounded-none">
                      {token.symbol}
                    </Badge>
                  </div>
                  
                  {isLoading ? (
                    <Badge className="mt-2 bg-muted text-muted-foreground text-[8px] rounded-none">
                      Loading...
                    </Badge>
                  ) : liveData?.[token.id] ? (
                    <Badge 
                      className={`mt-2 text-white border-0 text-[8px] rounded-none ${liveData[token.id].change.startsWith('+') ? 'bg-status-online' : 'bg-destructive'}`}
                    >
                      {liveData[token.id].change}
                    </Badge>
                  ) : (
                    <Badge className="mt-2 bg-muted text-muted-foreground text-[8px] rounded-none">
                      N/A
                    </Badge>
                  )}
                </div>
              </div>
              
              {token.contract && (
                <div className="mb-4">
                  <p className="text-[8px] text-muted-foreground mb-1">Contract Address</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(token.contract);
                    }}
                    className="w-full text-left text-[8px] font-mono bg-muted p-2 overflow-x-auto hover:bg-muted/80 transition-colors cursor-pointer border-2 border-transparent hover:border-primary/50"
                    title="Click to copy"
                    data-testid={`button-copy-contract-${token.symbol.replace('$', '')}`}
                  >
                    {token.contract}
                  </button>
                </div>
              )}
              
              <div className="flex gap-3 mb-4">
                {token.links.x && (
                  <a 
                    href={token.links.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border-2 border-border social-icon-hover"
                    data-testid={`link-x-${token.symbol.replace('$', '')}`}
                  >
                    <SiX className="w-4 h-4" />
                  </a>
                )}
                {token.links.github && (
                  <a 
                    href={token.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border-2 border-border social-icon-hover"
                    data-testid={`link-github-${token.symbol.replace('$', '')}`}
                  >
                    <SiGithub className="w-4 h-4" />
                  </a>
                )}
                {token.links.pumpfun && (
                  <a 
                    href={token.links.pumpfun}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border-2 border-border social-icon-hover"
                    data-testid={`link-pumpfun-${token.symbol.replace('$', '')}`}
                  >
                    <Rocket className="w-4 h-4" />
                  </a>
                )}
                {token.links.website && (
                  <a 
                    href={token.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border-2 border-border social-icon-hover"
                    data-testid={`link-website-${token.symbol.replace('$', '')}`}
                  >
                    <Star className="w-4 h-4" />
                  </a>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[8px] text-muted-foreground">Price</p>
                  <p className="text-[10px] md:text-xs" data-testid={`text-price-${token.symbol.replace('$', '')}`}>
                    {isLoading ? "..." : liveData?.[token.id]?.price || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[8px] text-muted-foreground">MCap</p>
                  <p className="text-[10px] md:text-xs" data-testid={`text-mcap-${token.symbol.replace('$', '')}`}>
                    {isLoading ? "..." : liveData?.[token.id]?.mcap || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[8px] text-muted-foreground">Volume 24h</p>
                  <p className="text-[10px] md:text-xs" data-testid={`text-volume-${token.symbol.replace('$', '')}`}>
                    {isLoading ? "..." : liveData?.[token.id]?.volume || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[8px] text-muted-foreground">Liquidity</p>
                  <p className="text-[10px] md:text-xs" data-testid={`text-liquidity-${token.symbol.replace('$', '')}`}>
                    {isLoading ? "..." : liveData?.[token.id]?.liquidity || "N/A"}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function MCPSection() {
  const mcpTools = [
    {
      id: "elizaos-cloud",
      name: "ElizaOS Cloud MCP",
      version: "v1.0.0",
      toolCount: 20,
      status: "ACTIVE",
      description: "Core ElizaOS Cloud platform MCP with credit management, AI generation, memory, conversations, and agent interaction capabilities.",
      features: ["Credit Management", "AI Text Generation", "Image Generation", "+2 more"],
      pricing: "Pay-per-use with credits"
    },
    {
      id: "time-date",
      name: "Time & Date MCP",
      version: "v1.0.0",
      toolCount: 4,
      status: "ACTIVE",
      description: "Get current time, timezone conversions, and date calculations. Perfect for scheduling and time-aware applications.",
      features: ["Current Time", "Timezone Conversion", "Date Formatting", "+1 more"],
      pricing: "1 credit per request"
    },
    {
      id: "weather",
      name: "Weather MCP",
      version: "v1.0.0",
      toolCount: 3,
      status: "ACTIVE",
      description: "Real-time weather data, forecasts, and alerts. Supports both credits and x402 micropayments.",
      features: ["Current Weather", "5-Day Forecast", "Weather Alerts"],
      pricing: "1-3 credits per request (or x402)"
    },
    {
      id: "crypto-price",
      name: "Crypto Price MCP",
      version: "v1.0.0",
      toolCount: 5,
      status: "ACTIVE",
      description: "Real-time cryptocurrency prices, market data, and historical charts. Supports both credits and x402 payments.",
      features: ["Live Prices", "Market Cap Data", "Price History", "+2 more"],
      pricing: "1-3 credits per request (or x402)"
    }
  ];

  const getIcon = (id: string) => {
    switch (id) {
      case "elizaos-cloud": return Cpu;
      case "time-date": return Clock;
      case "weather": return Cloud;
      case "crypto-price": return Bitcoin;
      default: return Zap;
    }
  };

  return (
    <section 
      id="mcp"
      className="py-16 md:py-24 px-4 bg-background crt-scan dot-matrix relative overflow-hidden"
      data-testid="section-mcp"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-4 mb-12 fade-in-up">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-8 h-[2px] bg-primary/30" />
            <Cpu className="w-4 h-4 text-primary flicker-text" />
          </div>
          <h2 className="text-xl md:text-2xl text-center">
            CELICA OS MCP
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary flicker-text" />
            <div className="w-8 h-[2px] bg-primary/30" />
          </div>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {mcpTools.map((tool, index) => {
            const IconComponent = getIcon(tool.id);
            return (
              <AccordionItem 
                key={tool.id} 
                value={tool.id}
                className={`border-4 border-border bg-card rounded-none overflow-visible fade-in-up stagger-${index + 1} pixel-shadow-hover`}
                data-testid={`accordion-mcp-${tool.id}`}
              >
                <AccordionTrigger 
                  className="px-6 py-4 hover:no-underline rounded-none [&[data-state=open]>div]:bg-muted"
                  data-testid={`button-accordion-trigger-${tool.id}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-2 bg-primary/10 border-2 border-border rounded-none">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs md:text-sm" data-testid={`text-mcp-name-${tool.id}`}>{tool.name}</span>
                        <span className="text-[8px] text-muted-foreground" data-testid={`text-mcp-version-${tool.id}`}>{tool.version}</span>
                        <Badge variant="secondary" className="text-[8px] rounded-none" data-testid={`badge-mcp-tools-${tool.id}`}>{tool.toolCount} tools</Badge>
                      </div>
                    </div>
                    <Badge className="bg-status-online text-white border-0 text-[8px] rounded-none" data-testid={`badge-mcp-status-${tool.id}`}>
                      {tool.status}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-[10px] md:text-xs text-muted-foreground mb-4 leading-relaxed" data-testid={`text-mcp-description-${tool.id}`}>
                    {tool.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.features.map((feature, featureIndex) => (
                      <Badge 
                        key={feature}
                        variant="outline"
                        className="text-[8px] px-2 py-1 border-2 badge-hover rounded-none"
                        data-testid={`badge-mcp-feature-${tool.id}-${featureIndex}`}
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] text-muted-foreground">Pricing:</span>
                    <span className="text-[10px]" data-testid={`text-mcp-pricing-${tool.id}`}>{tool.pricing}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer 
      className="py-8 px-4 bg-primary text-primary-foreground"
      data-testid="section-footer"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="CELICA OS" 
              className="w-8 h-8 pixelated border-2 border-white"
            />
            <span className="text-xs">CELICA OS</span>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="https://x.com/celicaos"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border-2 border-white/30 social-icon-hover bg-white/10"
              data-testid="link-footer-x"
            >
              <SiX className="w-4 h-4" />
            </a>
            <a 
              href="https://github.com/CelicaOS/project-celica-os"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border-2 border-white/30 social-icon-hover bg-white/10"
              data-testid="link-footer-github"
            >
              <SiGithub className="w-4 h-4" />
            </a>
            <a 
              href="https://pump.fun/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border-2 border-white/30 social-icon-hover bg-white/10"
              data-testid="link-footer-pumpfun"
            >
              <Rocket className="w-4 h-4" />
            </a>
          </div>
          
          <p className="text-[8px] text-white/70">
            2025 CELICA OS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {loading && (
        <LoadingScreen 
          progress={Math.floor(progress)} 
          onComplete={handleLoadingComplete} 
        />
      )}
      
      <main 
        className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
      >
        <HeroSection />
        <ProfileSection />
        <NetworkSection />
        <MCPSection />
        <Footer />
      </main>
    </div>
  );
}
