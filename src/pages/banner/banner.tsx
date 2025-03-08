import { addBannerMutation, getBannerQuery } from "@/api/banner/banner-query";
import LoadingSpinner from "@/components/loading";
import RHFIileInput from "@/components/rhf-file-input";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";

const Banner = () => {
  const methods = useForm();
  const { data, isLoading } = getBannerQuery();
  const { mutate, isPending } = addBannerMutation();

  const onSubmit = (data: any) => {
    mutate(data);
    methods.reset();
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-4">
      <Title title="Banner" />

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <RHFIileInput
            multiple
            id="image"
            name="images"
            type="image"
            className="w-52"
          />

          <Button variant={"outline"} disabled={isPending}>
            Add
          </Button>
        </form>
      </FormProvider>
      {/* }
      /> */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data?.images.map((image) => (
          <Card>
            <CardContent>
              <img
                src={image.url}
                className="w-full h-52 object-cover"
                alt="Banner"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Banner;
