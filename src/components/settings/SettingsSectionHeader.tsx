
import React from "react";

interface SettingsSectionHeaderProps {
  title: string;
  description?: string;
}

export const SettingsSectionHeader: React.FC<SettingsSectionHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold tracking-tight text-gray-900">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
};
