
export type Asset = {
  id: string;
  name: string;
  type: string;
  environment: string;
  status: string;
  last_scan: string;
  ip_address: string | null;
  endpoint: string | null;
};

export type AssetStats = {
  total: number;
  vulnerable: number;
  secured: number;
};
