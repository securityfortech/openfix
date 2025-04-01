
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Asset } from "@/types/asset";
import SelectField, { SelectOption } from "./SelectField";

interface AssetSelectFieldProps {
  form: UseFormReturn<any>;
  assets: Asset[];
  isLoadingAssets: boolean;
}

const AssetSelectField: React.FC<AssetSelectFieldProps> = ({
  form,
  assets,
  isLoadingAssets,
}) => {
  const assetOptions: SelectOption[] = [
    { value: "", label: "None" },
    ...(isLoadingAssets 
      ? [{ value: "", label: "Loading assets...", disabled: true }]
      : assets.map((asset) => ({
          value: asset.id,
          label: `${asset.name} (${asset.type})`,
        }))
    ),
  ];

  return (
    <SelectField
      form={form}
      name="asset_id"
      label="Related Asset"
      placeholder="Select an asset (optional)"
      options={assetOptions}
    />
  );
};

export default AssetSelectField;
