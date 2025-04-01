
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Asset } from "@/types/asset";

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
    return <div className="py-8 text-center text-muted-foreground">Loading assets...</div>;
  }

  if (assets.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No assets found. Add your first asset to get started.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{customColumns?.nameHeader || "Asset Name"}</TableHead>
          <TableHead>{customColumns?.secondColumn?.header || "Type"}</TableHead>
          <TableHead>Environment</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Scan</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assets.map(asset => (
          <TableRow key={asset.id}>
            <TableCell className="font-medium">{asset.name}</TableCell>
            <TableCell>
              {customColumns 
                ? customColumns.secondColumn.accessor(asset) 
                : asset.type}
            </TableCell>
            <TableCell>{asset.environment}</TableCell>
            <TableCell>
              {asset.status === 'vulnerable' ? (
                <Badge variant="destructive">Vulnerable</Badge>
              ) : asset.status === 'warning' ? (
                <Badge variant="outline" className="bg-amber-100 text-amber-700">Warning</Badge>
              ) : (
                <Badge variant="outline" className="bg-green-100 text-green-700">Secured</Badge>
              )}
            </TableCell>
            <TableCell>{formatLastScan(asset.last_scan)}</TableCell>
            <TableCell>
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
  );
};
