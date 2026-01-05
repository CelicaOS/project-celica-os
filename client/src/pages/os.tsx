import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Terminal, Users, ArrowLeft } from "lucide-react";
import logoImage from "@assets/VirtuPay_(3)_1767521033473.png";
import elizaOsLogo from "@assets/https___gmgn.ai_external-res_8ec28ada60c00c30e749b13ea98d2242_1767522675487.webp";

interface MenuItem {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  iconComponent: typeof Terminal | null;
  href: string;
  comingSoon?: boolean;
  external?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: "framework",
    title: "Framework",
    description: "ElizaOS Cloud Integration",
    icon: elizaOsLogo,
    iconComponent: null,
    href: "https://docs.elizaos.ai/",
    comingSoon: false,
    external: true
  },
  {
    id: "terminal",
    title: "Terminal",
    description: "Access the command line",
    icon: null,
    iconComponent: Terminal,
    href: "/terminal",
    comingSoon: false
  },
  {
    id: "my-celica",
    title: "My Celica",
    description: "Your personal companion",
    icon: logoImage,
    iconComponent: null,
    href: "https://www.elizacloud.ai/dashboard/chat?characterId=cd1e58f8-d0ab-465e-bc05-e32aab2d9187",
    comingSoon: false,
    external: true
  },
  {
    id: "social",
    title: "Social",
    description: "Connect with the community",
    icon: null,
    iconComponent: Users,
    href: "https://x.com/celiaosxyz?s=21",
    comingSoon: false,
    external: true
  }
];

function MenuCard({ item }: { item: MenuItem }) {
  const IconComponent = item.iconComponent;
  
  const cardContent = (
    <Card 
      className="p-6 md:p-8 border-4 border-border rounded-none pixel-shadow-hover cursor-pointer relative overflow-visible group"
      data-testid={`card-menu-${item.id}`}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-primary flex items-center justify-center bg-primary/5 relative">
          {item.icon ? (
            <img 
              src={item.icon} 
              alt={item.title} 
              className="w-12 h-12 md:w-16 md:h-16 pixelated object-cover"
            />
          ) : IconComponent ? (
            <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          ) : null}
          
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary" />
        </div>
        
        <div>
          <h3 className="text-sm md:text-base mb-2">{item.title}</h3>
          <p className="text-[8px] md:text-[10px] text-muted-foreground">{item.description}</p>
        </div>
        
        {item.comingSoon && (
          <div className="absolute top-2 right-2">
            <span className="text-[6px] md:text-[8px] px-2 py-1 bg-primary text-primary-foreground">
              SOON
            </span>
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 border-4 border-transparent group-hover:border-primary/30 transition-colors pointer-events-none" />
    </Card>
  );
  
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {cardContent}
      </a>
    );
  }
  
  if (!item.comingSoon && item.href.startsWith("/")) {
    return (
      <Link href={item.href}>
        <a>{cardContent}</a>
      </Link>
    );
  }
  
  return cardContent;
}

export default function OsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground crt-scan relative">
      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
        <Link href="/">
          <a 
            className="flex items-center gap-2 px-4 py-2 border-2 border-primary/30 text-[10px] hover:bg-primary/10 transition-colors"
            data-testid="link-back-home"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>BACK</span>
          </a>
        </Link>
      </div>
      
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
        <div className="hud-status">
          <div className="blink-indicator" />
          <span className="text-[8px]">CELICA OS</span>
          <span className="terminal-cursor" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img 
                src={logoImage} 
                alt="CELICA OS" 
                className="w-16 h-16 md:w-24 md:h-24 pixelated border-4 border-primary"
              />
            </div>
            
            <h1 className="text-2xl md:text-4xl mb-4 glitch-hover">CELICA OS</h1>
            
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <div className="signal-bars">
                <div className="signal-bar" />
                <div className="signal-bar" />
                <div className="signal-bar" />
                <div className="signal-bar" />
              </div>
              <span className="text-[10px] md:text-xs">SELECT MODULE</span>
              <div className="signal-bars">
                <div className="signal-bar" />
                <div className="signal-bar" />
                <div className="signal-bar" />
                <div className="signal-bar" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {menuItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
          
          <div className="mt-12 md:mt-16 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 border-2 border-primary/20 bg-primary/5">
              <div className="blink-indicator" />
              <span className="text-[8px] md:text-[10px] text-muted-foreground">
                STATUS ONLINE
              </span>
              <span className="terminal-cursor" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
        <div className="flex items-center justify-between text-[8px] text-muted-foreground">
          <span>v1.0.0</span>
          <span className="flicker-text">MODULES LOADING...</span>
          <span>2025</span>
        </div>
      </div>
    </div>
  );
}
