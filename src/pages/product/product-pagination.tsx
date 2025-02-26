import { Button } from "@/components/ui/button";

interface ProductPaginationProps {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
}

const ProductPagination = ({
  page,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: ProductPaginationProps) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <Button
        variant="outline"
        disabled={!hasPreviousPage}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>
      <span className="text-sm">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={!hasNextPage}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default ProductPagination;
