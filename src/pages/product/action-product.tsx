import {
  getChildrenProductTypes,
  getParentProductTypesQuery,
} from "@/api/product-type/product-type-query";
import { addProduct } from "@/api/products/type";
import RHFIileInput from "@/components/rhf-file-input";
import LoadingSpinner from "@/components/loading";
import RHFSelect from "@/components/rhf-select";
import RHFTextarea from "@/components/rhf-textarea";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import {
  addProductsQuery,
  editProductsQuery,
  getOneProductsQuery,
} from "@/api/products/products-query";
import Title from "@/components/title";
// import MultiValueInput from "@/components/multi-value-input";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import MultiTagInput from "@/components/rhf-multi-tag-input";
import RHFCheckbox from "@/components/rhf-checkbox";
import { X } from "lucide-react";
import { imageType } from "@/api/uplaod-file.ts/type";

const ActionProduct = () => {
  const { id } = useParams();
  const methods = useForm<addProduct>({});
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "attributes",
    // rules: { required: true },
  });
  const parentProductTypeValue = methods.watch("productTypeId");

  const { data, isLoading } = getOneProductsQuery(id!);
  const { data: parentProducType, isLoading: parentProductTypeLoading } =
    getParentProductTypesQuery();

  const { data: childrenProductType } = getChildrenProductTypes(
    parentProductTypeValue
  );

  const { mutate: add, isPending: isAdding } = addProductsQuery();
  const { mutate: edit, isPending: isEditing } = editProductsQuery();

  const submitHandler = (data: any) => {
    var productTypeId = data.productTypeId;

    if (data.childrenProductTypeId) {
      productTypeId = data.childrenProductTypeId;

      delete data.childrenProductTypeId;
    }

    delete data.productType;


    id
      ? edit({
          id,
          params: {
            ...data,
            productTypeId,
            logo: (data.logo as imageType[])[0],
          },
        })
      : add({
          ...data,
          productTypeId,
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
    }
  }, [data, id, methods]);

  if (parentProductTypeLoading || isLoading) return <LoadingSpinner />;

  return (
    <FormProvider {...methods}>
      <Title title={id ? "Edit Product" : "Add Product"} />

      <Card className="w-full md:w-1/2 mb-5 mt-10 mx-auto">
        <CardContent>
          <form
            onSubmit={methods.handleSubmit(submitHandler)}
            className="grid grid-cols-1 gap-4"
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
            <RHFTextarea
              required
              name="notes"
              control={methods.control}
              label="Additional Info"
              placeholder="Enter Additional Info"
              defaultValue={
                "اذا كان القياس XL فـ اكثر الرجاء الكتابه في الملاحظات"
              }
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

            <RHFSelect
              name="childrenProductTypeId"
              control={methods.control}
              items={
                childrenProductType?.productTypes.map(({ _id, name }) => ({
                  label: name,
                  value: _id,
                })) ?? []
              }
              placeholder="Enter Product Type"
              label="Product Type"
            />

            {/* <MultiValueInput
          setValue={setValue}
          value={value}
          onChange={(newValue) => methods.setValue("availableSizes", newValue)}
          label="Available Sizes"
        /> */}
            <MultiTagInput
              type="number"
              control={methods.control}
              name={`availableSizes`}
              label="Available Sizes"
            />

            <div className="">
              <RHFIileInput name="logo" id="logo" type="image" label="Logo:" />
            </div>

            <div className="">
              <RHFIileInput
                multiple
                name="images"
                id="images"
                type="image"
                label="Select Multiple Images:"
              />
            </div>

            <div className="">
              <RHFIileInput
                multiple
                name="videos"
                id="videos"
                type="video"
                label="Select Multiple Videos:"
              />
            </div>

            <div className="flex flex-col gap-4 ">
              <Label>Attributes</Label>
              <div className="flex flex-col gap-2">
                {fields.map((_, index) => (
                  <Card>
                    <CardContent className="flex flex-col gap-2 relative">
                      <X
                        className="absolute top-1 right-1 cursor-pointer"
                        onClick={() => remove(index)}
                      />
                      <TextField
                        name={`attributes.${index}.name`}
                        control={methods.control}
                        label={"Name"}
                        placeholder={"Enter a name"}
                      />

                      <MultiTagInput
                        control={methods.control}
                        name={`attributes.${index}.options`}
                        label="options"
                      />
                      <RHFCheckbox
                        name={`attributes.${index}.required`}
                        control={methods.control}
                        label="Required"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button
                type="button"
                onClick={() => {
                  append({} as any);
                }}
              >
                + Add Attribute
              </Button>
            </div>

            <div className="">
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
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default ActionProduct;
