import { getParentProductTypesQuery } from "@/api/product-type/product-type-query";
import { addProduct } from "@/api/products/type";
import RHFIileInput from "@/components/rhf-file-input";
import LoadingSpinner from "@/components/loading";
import RHFSelect from "@/components/rhf-select";
import RHFTextarea from "@/components/rhf-textarea";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import {
  addProductsQuery,
  editProductsQuery,
  getOneProductsQuery,
} from "@/api/products/products-query";
import Title from "@/components/title";
import MultiValueInput from "@/components/multi-value-input";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { DevTool } from "@hookform/devtools";
import { imageType } from "@/api/uplaod-file.ts/type";

const ActionProduct = () => {
  const { id } = useParams();
  const methods = useForm<addProduct>({});
  const [value, setValue] = useState([]);

  const { data, isLoading } = getOneProductsQuery(id!);
  const { data: parentProducType, isLoading: parentProductTypeLoading } =
    getParentProductTypesQuery();
  const { mutate: add, isPending: isAdding } = addProductsQuery();
  const { mutate: edit, isPending: isEditing } = editProductsQuery();

  const submitHandler = (data: addProduct) => {
    id
      ? edit({
          id,
          params: {
            ...data,
            logo: (data.logo as imageType[])[0],
          },
        })
      : add({
          ...data,
          logo: (data.logo as imageType[])[0],
        });
  };

  useEffect(() => {
    const values = data?.data;

    if (id && values) {
      methods.reset({
        ...values,
        productTypeId: values.productType._id,
        logo: [values.logo],
      });

      setValue(
        (values.availableSizes.map((size) => ({
          value: size,
          label: size,
        })) as any) ?? []
      );
    }
  }, [data, id, methods]);

  if (parentProductTypeLoading || isLoading) return <LoadingSpinner />;

  return (
    <FormProvider {...methods}>
      <Title title={id ? "Edit Product" : "Add Product"} />

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
        />

        <MultiValueInput
          setValue={setValue}
          value={value}
          onChange={(newValue) => methods.setValue("availableSizes", newValue)}
          label="Available Sizes"
        />

        <RHFIileInput name="logo" id="logo" type="image" label="Logo:" />

        <RHFIileInput
          multiple
          name="images"
          id="images"
          type="image"
          label="Select Multiple Images:"
        />

        <RHFIileInput
          multiple
          name="videos"
          id="videos"
          type="video"
          label="Select Multiple Videos:"
        />

        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <Button
            disabled={isAdding || isEditing}
            type="submit"
            className="w-full"
          >
            Save
          </Button>
        </div>
        {/* <DevTool control={methods.control} /> */}
      </form>
    </FormProvider>
  );
};

export default ActionProduct;
