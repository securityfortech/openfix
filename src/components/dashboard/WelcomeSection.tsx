
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface WelcomeSectionProps {
  userName: string;
}

const WelcomeSection = ({ userName }: WelcomeSectionProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold">Welcome back, {userName}</h2>
        <p className="text-muted-foreground">Monitor your project vulnerabilities and security status</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
        <Button className="flex items-center gap-2">
          Start New Scan
        </Button>
      </div>
    </div>
  );
};

export default WelcomeSection;
