
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Shield } from "lucide-react";
import { AssetStats as AssetStatsType } from "@/types/asset";

interface AssetStatsProps {
  stats: AssetStatsType;
}

export const AssetStats: React.FC<AssetStatsProps> = ({ stats }) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <span>Total Assets</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.total}</div>
          <p className="text-muted-foreground text-sm">Across all environments</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            <span>Vulnerable Assets</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.vulnerable}</div>
          <p className="text-muted-foreground text-sm">Assets with security issues</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            <span>Protected Assets</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.secured}</div>
          <p className="text-muted-foreground text-sm">Assets with no known issues</p>
        </CardContent>
      </Card>
    </div>
  );
};
