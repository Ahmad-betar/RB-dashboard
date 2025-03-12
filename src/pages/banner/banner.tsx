import { addBannerMutation, getBannerQuery } from "@/api/banner/banner-query";
import { imageType } from "@/api/uplaod-file.ts/type";
import LoadingSpinner from "@/components/loading";
import RHFIileInput from "@/components/rhf-file-input";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

const Banner = () => {
  const methods = useForm<{ images: imageType[] }>();
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "images",
  });
  const { data, isLoading } = getBannerQuery();
  const { mutate, isPending } = addBannerMutation();

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess() {
        methods.reset();
        remove();
      },
    });
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
          {fields.map((_field, idx) => (
            <RHFIileInput
              key={idx}
              id="image"
              name={`images.${idx}`}
              type="image"
              className="w-52"
            />
          ))}

          <Button
            type="button"
            variant={"outline"}
            onClick={() => append(undefined as any)}
          >
            Add image
          </Button>

          <Button
            variant={"outline"}
            disabled={isPending || fields.length === 0}
          >
            Add
          </Button>
        </form>
      </FormProvider>
      {/* }
      /> */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data?.images.map((image) => (
          <Card key={image.url}>
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
