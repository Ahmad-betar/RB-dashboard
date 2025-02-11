import { ReactNode } from "react";

const CardText = ({ title, value }: { title: string; value: ReactNode }) => {
  return (
    <p className="flex items-center gap-2">
      <span className="font-normal">{title}: </span>
      {value}
    </p>
  );
};

export default CardText;
