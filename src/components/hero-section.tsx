import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp, Shield } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface HeroSectionProps {
  onGetStarted: (userType: 'vendor' | 'supplier') => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Indian street food ingredients" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float blur-xl" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent/10 rounded-full animate-float delay-1000 blur-xl" />
      <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-secondary/10 rounded-full animate-float delay-2000 blur-xl" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center text-center">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            RastalConnect
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl">
            Connecting Street Food Vendors with Trusted Local Suppliers
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Build trust, reduce costs, and ensure quality through our hyperlocal B2B marketplace 
            designed specifically for India's vibrant street food ecosystem.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full max-w-4xl">
          <div className="bg-gradient-card backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-card">
            <Users className="w-8 h-8 text-primary mb-3 mx-auto" />
            <h3 className="text-2xl font-bold text-foreground mb-2">10,000+</h3>
            <p className="text-muted-foreground">Street Food Vendors</p>
          </div>
          <div className="bg-gradient-card backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-card">
            <TrendingUp className="w-8 h-8 text-accent mb-3 mx-auto" />
            <h3 className="text-2xl font-bold text-foreground mb-2">30%</h3>
            <p className="text-muted-foreground">Cost Reduction</p>
          </div>
          <div className="bg-gradient-card backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-card">
            <Shield className="w-8 h-8 text-secondary mb-3 mx-auto" />
            <h3 className="text-2xl font-bold text-foreground mb-2">100%</h3>
            <p className="text-muted-foreground">Verified Suppliers</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <Button 
            variant="vendor" 
            size="lg"
            onClick={() => onGetStarted('vendor')}
            className="flex-1"
          >
            I'm a Vendor
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button 
            variant="supplier" 
            size="lg"
            onClick={() => onGetStarted('supplier')}
            className="flex-1"
          >
            I'm a Supplier
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">Trusted by vendors and suppliers across India</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-xs font-medium">Mumbai</div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="text-xs font-medium">Delhi</div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="text-xs font-medium">Bangalore</div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="text-xs font-medium">Chennai</div>
          </div>
        </div>
      </div>
    </section>
  );
};