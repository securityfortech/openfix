
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetTable } from "./AssetTable";
import { Asset } from "@/types/asset";

interface AssetTabsProps {
  assets: Asset[];
  loading: boolean;
  getFilteredAssets: (type: string) => Asset[];
  formatLastScan: (dateString: string) => string;
  handleScanAsset: (id: string) => Promise<void>;
  handleFixIssues: (id: string) => Promise<void>;
}

export const AssetTabs: React.FC<AssetTabsProps> = ({
  assets,
  loading,
  getFilteredAssets,
  formatLastScan,
  handleScanAsset,
  handleFixIssues
}) => {
  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All Assets</TabsTrigger>
        <TabsTrigger value="server">Servers</TabsTrigger>
        <TabsTrigger value="database">Databases</TabsTrigger>
        <TabsTrigger value="api">APIs</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-4">
        <Card>
          <CardContent className="p-0">
            <AssetTable
              assets={assets}
              loading={loading}
              formatLastScan={formatLastScan}
              handleScanAsset={handleScanAsset}
              handleFixIssues={handleFixIssues}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      {['server', 'database', 'api'].map(type => (
        <TabsContent key={type} value={type} className="mt-4">
          <Card>
            <CardContent className="p-0">
              <AssetTable
                assets={getFilteredAssets(type)}
                loading={loading}
                formatLastScan={formatLastScan}
                handleScanAsset={handleScanAsset}
                handleFixIssues={handleFixIssues}
                customColumns={{
                  nameHeader: type === 'server' ? 'Server Name' : type === 'database' ? 'Database Name' : 'API Name',
                  secondColumn: {
                    header: type === 'server' ? 'IP Address' : type === 'database' ? 'Type' : 'Endpoint',
                    accessor: (asset) => type === 'server' ? asset.ip_address : type === 'api' ? asset.endpoint : asset.type
                  }
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};
