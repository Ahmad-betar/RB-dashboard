import { ReactNode } from "react";

interface CardTextProps {
  title: string;
  value: ReactNode;
  withDivider?: boolean; // Add a divider below this item
  isSectionHeader?: boolean; // Make this a section header (bold and larger)
}

const CardText = ({
  title,
  value,
  withDivider,
  isSectionHeader,
}: CardTextProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={`flex items-center justify-between flex-wrap ${
          isSectionHeader ? "py-1" : ""
        }`}
      >
        <span
          className={`${
            isSectionHeader
              ? "text-lg font-bold"
              : "text-sm font-medium text-gray-600"
          }`}
        >
          {title}
        </span>
        <span
          className={`${
            isSectionHeader ? "text-lg font-bold" : "text-sm text-gray-800"
          }`}
        >
          {value}
        </span>
      </div>
      {withDivider && <hr className="border-t border-gray-200 my-2" />}
    </div>
  );
};

export default CardText;
