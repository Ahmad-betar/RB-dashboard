import { usePopularsQuery } from "@/api/popular/popular-query";
import Title from "@/components/title";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PopularTbale from "./popular-column";

const Popular = () => {
  const { data: populars } = usePopularsQuery();

  return (
    <div className="flex flex-col gap-8">
      <Title title="Popular" />

      <Link
        to={"/add-popular"}
        className={buttonVariants({
          variant: "outline",
          className: "ml-auto w-fit",
        })}
      >
        + Add
      </Link>

      <PopularTbale popular={populars!} />
    </div>
  );
};

export default Popular;
