
import React from "react";

interface WelcomeSectionProps {
  userName: string;
}

const WelcomeSection = ({ userName }: WelcomeSectionProps) => {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold">Welcome back, {userName}</h2>
      <p className="text-muted-foreground">Monitor your project vulnerabilities and security status</p>
    </div>
  );
};

export default WelcomeSection;
