import { useForm, Controller } from "react-hook-form";
import { getProductParams } from "@/api/products/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductFiltersProps {
  control: any;
  productTypes: { _id: string; name: string }[];
  onSubmit: (data: getProductParams) => void;
}

const ProductFilters = ({
  control,
  productTypes,
  onSubmit,
}: ProductFiltersProps) => {
  const { handleSubmit } = useForm<getProductParams>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div>
            <Label>Search</Label>
            <Controller
              name="search"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Search products" />
              )}
            />
          </div>
          <div>
            <Label>Sort By</Label>
            <Controller
              name="sort"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name:asc">Ascending</SelectItem>
                    <SelectItem value="name:desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label>Product Type</Label>
            <Controller
              name="productType"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((type) => (
                      <SelectItem key={type._id} value={type._id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label>Price Range</Label>
            <div className="flex gap-2">
              <Controller
                name="minPrice"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="number" placeholder="Min" />
                )}
              />
              <Controller
                name="maxPrice"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="number" placeholder="Max" />
                )}
              />
            </div>
          </div>
          <Button type="submit" className="col-span-full w-fit ml-auto">
            Apply Filters
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
