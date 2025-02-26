import { ReactNode } from "react";

interface LabeledDataProps {
  label: string;
  value: ReactNode;
  className?: string;
}

const LabeledData = ({ label, value, className }: LabeledDataProps) => {
  return (
    <div className={className}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
};

export default LabeledData;
