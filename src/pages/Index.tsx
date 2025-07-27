import { useState } from "react";
import { HeroSection } from "@/components/hero-section";
import { VendorDashboard } from "@/components/vendor-dashboard";
import { SupplierDashboard } from "@/components/supplier-dashboard";

type UserType = 'vendor' | 'supplier' | null;

const Index = () => {
  const [currentView, setCurrentView] = useState<UserType>(null);

  const handleGetStarted = (userType: UserType) => {
    setCurrentView(userType);
  };

  const handleBackToHome = () => {
    setCurrentView(null);
  };

  if (currentView === 'vendor') {
    return <VendorDashboard onBackToHome={handleBackToHome} />;
  }

  if (currentView === 'supplier') {
    return <SupplierDashboard onBackToHome={handleBackToHome} />;
  }

  return <HeroSection onGetStarted={handleGetStarted} />;
};

export default Index;
