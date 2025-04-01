
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Asset } from "@/types/asset";
import { Shield, ShieldAlert, ShieldCheck, Clock } from "lucide-react";

interface AssetTableProps {
  assets: Asset[];
  loading: boolean;
  formatLastScan: (dateString: string) => string;
  handleScanAsset: (id: string) => Promise<void>;
  handleFixIssues: (id: string) => Promise<void>;
  customColumns?: {
    nameHeader: string;
    secondColumn: {
      header: string;
      accessor: (asset: Asset) => string | null;
    };
  };
}

export const AssetTable: React.FC<AssetTableProps> = ({
  assets,
  loading,
  formatLastScan,
  handleScanAsset,
  handleFixIssues,
  customColumns
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-48"></div>
          <div className="h-4 bg-muted rounded w-64"></div>
        </div>
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <Shield className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No assets found</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Add your first asset to get started with monitoring and security scanning.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="font-medium">{customColumns?.nameHeader || "Asset Name"}</TableHead>
            <TableHead className="font-medium">{customColumns?.secondColumn?.header || "Type"}</TableHead>
            <TableHead className="font-medium">Environment</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="font-medium">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Last Scan</span>
              </div>
            </TableHead>
            <TableHead className="text-right font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map(asset => (
            <TableRow key={asset.id} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-medium">{asset.name}</TableCell>
              <TableCell>
                {customColumns 
                  ? customColumns.secondColumn.accessor(asset) 
                  : asset.type}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {asset.environment}
                </Badge>
              </TableCell>
              <TableCell>
                {asset.status === 'vulnerable' ? (
                  <div className="flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4 text-destructive" />
                    <Badge variant="destructive" className="font-medium">Vulnerable</Badge>
                  </div>
                ) : asset.status === 'warning' ? (
                  <div className="flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4 text-amber-500" />
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 font-medium">Warning</Badge>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    <Badge variant="outline" className="bg-green-100 text-green-700 font-medium">Secured</Badge>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">{formatLastScan(asset.last_scan)}</TableCell>
              <TableCell className="text-right">
                {asset.status === 'vulnerable' ? (
                  <Button size="sm" onClick={() => handleFixIssues(asset.id)}>Fix Issues</Button>
                ) : asset.status === 'warning' ? (
                  <Button variant="outline" size="sm" onClick={() => handleScanAsset(asset.id)}>Review</Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => handleScanAsset(asset.id)}>Scan Now</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
