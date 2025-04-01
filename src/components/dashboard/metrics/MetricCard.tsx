
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  loading: boolean;
  max?: number;
  valueClassName?: string;
  progressClassName?: string;
  suffix?: React.ReactNode;
}

export const MetricCard = ({
  title,
  value,
  change,
  loading,
  max = 100,
  valueClassName = "",
  progressClassName = "",
  suffix = ""
}: MetricCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-8 w-16 animate-pulse bg-muted rounded"></div>
        ) : (
          <>
            <div className={`text-3xl font-bold ${valueClassName}`}>
              {value}{suffix}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {change >= 0 ? '+' : ''}{change}% from last month
            </p>
            <Progress 
              value={value} 
              max={max} 
              className={`h-1 mt-3 ${progressClassName}`} 
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};
