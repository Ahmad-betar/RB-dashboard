import { useForm } from "react-hook-form";
import { buttonVariants } from "@/components/ui/button";
import LoadingSpinner from "@/components/loading";
import NoData from "@/components/no-data";
import Title from "@/components/title";
import { getOffersQuery } from "@/api/offer/offer-query";
import { Link } from "react-router-dom";
import OfferTbale from "./offer-column";

const OffersPage = () => {
  const { watch } = useForm({
    // defaultValues: { page: 1, limit: 10 },
  });
  const filters = watch();

  const { data, isLoading } = getOffersQuery(filters);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-4 mx-auto p-4">
      <Link
        to={"/add-offer"}
        className={buttonVariants({
          variant: "outline",
          className: "w-fit self-end ml-auto",
        })}
      >
        + Add Offer
      </Link>

      <Title title="Offers" />

      {/* Display Offers */}
      {data?.data.offers.length === 0 ? (
        <NoData />
      ) : (
        <OfferTbale offers={data?.data.offers!} />
      )}

      {/* Pagination */}
      {/* <div className="flex justify-between items-center mt-6">
        <Button
          variant="outline"
          disabled={filters.page === 1}
          onClick={() => setValue("page", filters.page - 1)}
        >
          Previous
        </Button>

        <span>Page {filters.page}</span>

        <Button
          variant="outline"
          //   disabled={filters.page * filters.limit >= data?.data.pagination.total}
          //   onClick={() => setValue("page", filters.page + 1)}
        >
          Next
        </Button>
      </div> */}
    </div>
  );
};

export default OffersPage;
