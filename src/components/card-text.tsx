import { ReactNode } from "react";

const CardText = ({
  title,
  value,
  breakLine,
}: {
  title: string;
  value: ReactNode;
  breakLine?: boolean;
}) => {
  if (breakLine)
    return (
      <>
        <span className="font-semibold">{title}:</span>
        <p className="flex items-start gap-2 font-normal">{value}</p>
      </>
    );

  return (
    <p className="flex items-start gap-2 font-normal">
      <span className="font-semibold">{title}:</span>
      {value}
    </p>
  );
};

export default CardText;
