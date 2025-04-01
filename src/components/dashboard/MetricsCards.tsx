
import React from "react";
import { useVulnerabilityStats } from "@/hooks/useVulnerabilityStats";
import { MetricCard } from "./metrics/MetricCard";

const MetricsCards = () => {
  const { stats, loading } = useVulnerabilityStats();
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Vulnerabilities"
        value={stats.total}
        change={stats.totalChange}
        loading={loading}
      />
      
      <MetricCard
        title="Critical Issues"
        value={stats.critical}
        change={stats.criticalChange}
        loading={loading}
        valueClassName="text-red-500"
        progressClassName="bg-red-100"
      />
      
      <MetricCard
        title="Fixed Issues"
        value={stats.fixed}
        change={stats.fixedChange}
        loading={loading}
        valueClassName="text-green-500"
        progressClassName="bg-green-100"
      />
      
      <MetricCard
        title="Security Score"
        value={stats.securityScore}
        change={stats.scoreChange}
        loading={loading}
        suffix={<span className="text-lg font-normal">/100</span>}
      />
    </div>
  );
};

export default MetricsCards;
