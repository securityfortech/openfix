
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
        <main className="p-4 md:p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Assets</h2>
              <p className="text-muted-foreground">Manage and monitor your application assets</p>
            </div>
            <AddAssetForm />
          </div>
          
          <AssetStats stats={stats} />
          
          <AssetTabs
            assets={assets}
            loading={loading}
            getFilteredAssets={getFilteredAssets}
            formatLastScan={formatLastScan}
            handleScanAsset={handleScanAsset}
            handleFixIssues={handleFixIssues}
          />
        </main>
      </div>
    </div>
  );
};

export default Assets;
