
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { AddAssetForm } from "@/components/assets/AddAssetForm";
import { AssetStats } from "@/components/assets/AssetStats";
import { AssetTabs } from "@/components/assets/AssetTabs";
import { useAssets } from "@/hooks/useAssets";

const Assets = () => {
  const { user } = useAuth();
  const {
    assets,
    loading,
    stats,
    handleScanAsset,
    handleFixIssues,
    getFilteredAssets,
    formatLastScan
  } = useAssets();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-6 space-y-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Assets</h2>
              <p className="text-muted-foreground mt-1">Manage and monitor your application assets securely</p>
            </div>
            <AddAssetForm />
          </div>
          
          <AssetStats stats={stats} />
          
          <div className="bg-card rounded-xl border shadow-sm">
            <AssetTabs
              assets={assets}
              loading={loading}
              getFilteredAssets={getFilteredAssets}
              formatLastScan={formatLastScan}
              handleScanAsset={handleScanAsset}
              handleFixIssues={handleFixIssues}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Assets;
