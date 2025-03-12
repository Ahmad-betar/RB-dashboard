import { addProduct } from "@/api/products/type";
import RHFIileInput from "@/components/rhf-file-input";
import LoadingSpinner from "@/components/loading";
import RHFSelect from "@/components/rhf-select";
import RHFTextarea from "@/components/rhf-textarea";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { FormProvider } from "react-hook-form";
import Title from "@/components/title";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import MultiTagInput from "@/components/rhf-multi-tag-input";
import RHFCheckbox from "@/components/rhf-checkbox";
import { X } from "lucide-react";
import { useActionProduct } from "./action-product-hook";

const ActionProduct = () => {
  const {
    id,
    methods,
    fields,
    append,
    remove,
    images,
    addImage,
    videos,
    addVideo,
    data,
    isLoading,
    parentProducType,
    parentProductTypeLoading,
    childrenProductType,
    add,
    isAdding,
    edit,
    isEditing,
  } = useActionProduct();

  const submitHandler = (data: addProduct) => {
    var productTypeId = data.productTypeId;

    if (data.childrenProductTypeId) {
      productTypeId = data.childrenProductTypeId;

      delete data.childrenProductTypeId;
    }

    id
      ? edit({
          id,
          params: {
            ...data,
            productTypeId,
          },
        })
      : add({
          ...data,
          productTypeId,
        });
  };

  useEffect(() => {
    if (id && data?.data) {
      methods.reset({
        ...data.data,
        productTypeId: data.data.productType._id,
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

            <MultiTagInput
              type="number"
              control={methods.control}
              name={`availableSizes`}
              label="Available Sizes"
            />

            <div className="">
              <RHFIileInput
                required
                name="logo"
                id="logo"
                type="image"
                label="Logo:"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Select Multiple Images:</Label>

              {images.map((_image, idx) => (
                <RHFIileInput
                  key={idx}
                  name={`images.${idx}`}
                  id={`images.${idx}`}
                  type="image"
                />
              ))}
              <Button
                type="button"
                variant={"outline"}
                className="w-full"
                onClick={() => addImage(undefined as any)}
              >
                Add Image
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Select Multiple Videos:</Label>

              {videos.map((_image, idx) => (
                <RHFIileInput
                  key={idx}
                  name={`videos.${idx}`}
                  id={`videos.${idx}`}
                  type="video"
                />
              ))}
              <Button
                type="button"
                variant={"outline"}
                className="w-full"
                onClick={() => addVideo(undefined as any)}
              >
                Add Video
              </Button>
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
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default ActionProduct;
