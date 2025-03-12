import {
  imageSizeMutation,
  imageSizeQuery,
} from "@/api/image-size/image-size-query";
import RHFIileInput from "@/components/rhf-file-input";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";

const ImageSize = () => {
  const methods = useForm();
  const { data } = imageSizeQuery();
  const { mutate, isPending } = imageSizeMutation();

  const onSubmit = (data: any) => {
    console.log(data);

    mutate(data, {
      onSuccess() {
        methods.reset();
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4">
        <Title title="Image Size" />

        <form
          className="flex flex-col gap-2"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <RHFIileInput id="image" name="image" type="image" />
          <Button variant={"outline"} disabled={isPending}>
            Add
          </Button>
        </form>

        <Card className="md:w-1/2 md:mx-auto">
          <CardContent>
            <img src={data?.image.url} alt="" />
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  );
};

export default ImageSize;
