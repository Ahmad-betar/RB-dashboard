import { getParentProductTypesQuery } from "@/api/product-type/product-type-query";
import { addProductForm } from "@/api/products/type";
import RHFIileInput from "@/components/rhf-file-input";
import LoadingSpinner from "@/components/loading";
import RHFSelect from "@/components/rhf-select";
import RHFTextarea from "@/components/rhf-textarea";
import TextField from "@/components/TextField";
import { Button, buttonVariants } from "@/components/ui/button";
import { Image, Plus, Video } from "lucide-react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  addProductsQuery,
  editProductsQuery,
  getOneProductsQuery,
} from "@/api/products/products-query";
import Title from "@/components/title";
import MultiValueInput from "@/components/multi-value-input";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DevTool } from "@hookform/devtools";

const ActionProduct = () => {
  const { id } = useParams();
  const [value, setValue] = useState([]);

  const { data, isLoading } = getOneProductsQuery(id!);
  const { data: parentProducType, isLoading: parentProductTypeLoading } =
    getParentProductTypesQuery();
  const { mutate: add, isPending: isAdding } = addProductsQuery();
  const { mutate: edit, isPending: isEditing } = editProductsQuery();
  const methods = useForm<addProductForm>({
    defaultValues: { imagesUrls: [] },
  });
  const { fields: images, append: appendImage } = useFieldArray<addProductForm>(
    {
      control: methods.control,
      name: "imagesUrls",
    }
  );
  const { fields: videos, append: appendVideos } =
    useFieldArray<addProductForm>({
      control: methods.control,
      name: "videosUrls",
    });

  const submitHandler = (data: addProductForm) => {
    const imagesUrls = data.imagesUrls
      .filter(({ image }) => image !== null)
      .map(({ image }) => image);

    const videosUrls = data.videosUrls
      .filter(({ video }) => video !== null)
      .map(({ video }) => video);

    id
      ? edit({
          id,
          params: {
            ...data,
            imagesUrls,
            videosUrls,
          },
        })
      : add({
          ...data,
          imagesUrls,
          videosUrls,
        });
  };

  useEffect(() => {
    const values = data?.data;
    if (id) {
      methods.reset({
        ...values,
        productTypeId: values?.productType._id,
        imagesUrls: values?.imagesUrls.map((imageUrl) => ({
          image: imageUrl,
        }))!,
        videosUrls: values?.videosUrls.map((videoUrl) => ({
          video: videoUrl,
        }))!,
      });

      setValue(
        (values?.availableSizes.map((value) => ({
          value,
          label: value,
        })) as any) ?? []
      );
    }
  }, [isLoading, data, id, methods]);

  if (parentProductTypeLoading || isLoading) return <LoadingSpinner />;
  return (
    <FormProvider {...methods}>
      <Title title="Add Product" />

      <form
        onSubmit={methods.handleSubmit(submitHandler)}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-5 mt-10"
      >
        <TextField
          required
          name="title"
          control={methods.control}
          label="Title"
          placeholder="Enter Title"
        />
        <RHFTextarea
          required
          name="description"
          control={methods.control}
          label="Description"
          placeholder="Enter Description"
        />
        <TextField
          required
          type="number"
          name="weight"
          control={methods.control}
          label="Weight"
          placeholder="Enter Weight"
        />
        <TextField
          required
          type="number"
          name="price"
          control={methods.control}
          label="Price"
          placeholder="Enter Price"
        />
        <RHFSelect
          required
          name="productTypeId"
          control={methods.control}
          items={
            parentProducType?.productTypes.map(({ _id, name }) => ({
              label: name,
              value: _id,
            })) ?? []
          }
          placeholder="Enter Product Type"
          label="Product Type"
          onValueChange={(value: string) => {
            methods.setValue("productTypeId", value);
          }}
        />

        <MultiValueInput
          setValue={setValue}
          value={value}
          onChange={(newValue) => methods.setValue("availableSizes", newValue)}
          label="Available Sizes"
        />

        <RHFIileInput
          Icon={<Image />}
          name="logoUrl"
          id="logo"
          type="image"
          label="Logo:"
        />

        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col gap-4">
          <Label>Product Images:</Label>

          <div className="md:flex gap-4">
            {images.map(({ id }, index) => (
              <RHFIileInput
                key={id}
                Icon={<Image />}
                name={`imagesUrls.${index}.image`}
                id={"image" + id}
                type="image"
              />
            ))}

            {images.length <= 9 && (
              <Button
                type="button"
                onClick={() => appendImage({ image: undefined })}
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full md:w-fit mt-2 md:mt-0",
                })}
              >
                <Plus className="fill-black stroke-black" />
              </Button>
            )}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col gap-4">
          <Label>Product Videos:</Label>

          <div className="md:flex gap-4">
            {videos.map(({ id }, index) => (
              <RHFIileInput
                key={id}
                Icon={<Video />}
                name={`videosUrls.${index}.video`}
                id={"video" + id}
                type="video"
              />
            ))}

            {videos.length <= 9 && (
              <Button
                type="button"
                onClick={() => appendVideos({ video: undefined })}
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full md:w-fit mt-2 md:mt-0",
                })}
              >
                <Plus className="fill-black stroke-black" />
              </Button>
            )}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <Button
            disabled={isAdding || isEditing}
            type="submit"
            className="w-full"
          >
            Save
          </Button>
        </div>
        <DevTool control={methods.control} />
      </form>
    </FormProvider>
  );
};

export default ActionProduct;
