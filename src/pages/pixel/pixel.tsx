import { useAddPixelMutation, usePixelQuery } from "@/api/pixel/pixel-query";
import { AddPixelRequest } from "@/api/pixel/type";
import RHFTextarea from "@/components/rhf-textarea";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const Pixel = () => {
  const { control, handleSubmit, reset } = useForm<AddPixelRequest>();
  const { mutate, isPending } = useAddPixelMutation();
  const { data } = usePixelQuery();

  const onSubmit = (data: AddPixelRequest) => {
    mutate(data);
  };

  useEffect(() => {
    reset(data);
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      <Title title="Pixel" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="md:w-1/2 mx-auto">
          <CardContent className="flex flex-col gap-2">
            <RHFTextarea name="meta" control={control} label="Meta Pixel" />

            <RHFTextarea
              name="snapchat"
              control={control}
              label="Snapchat Pixel"
            />
            <RHFTextarea name="tiktok" control={control} label="Tiktok Pixel" />

            <Button disabled={isPending}>Edit</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Pixel;
