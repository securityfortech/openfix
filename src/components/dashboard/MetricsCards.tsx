
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const MetricsCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Vulnerabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">36</div>
          <p className="text-xs text-muted-foreground mt-1">+2.5% from last month</p>
          <Progress value={36} max={100} className="h-1 mt-3" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Critical Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-500">8</div>
          <p className="text-xs text-muted-foreground mt-1">-14% from last month</p>
          <Progress value={8} max={100} className="h-1 mt-3 bg-red-100" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Fixed Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-500">24</div>
          <p className="text-xs text-muted-foreground mt-1">+42% from last month</p>
          <Progress value={24} max={100} className="h-1 mt-3 bg-green-100" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Security Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">78<span className="text-lg font-normal">/100</span></div>
          <p className="text-xs text-muted-foreground mt-1">+5 points from last month</p>
          <Progress value={78} max={100} className="h-1 mt-3" />
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
