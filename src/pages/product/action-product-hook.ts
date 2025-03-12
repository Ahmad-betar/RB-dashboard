import {
  getChildrenProductTypes,
  getParentProductTypesQuery,
} from "@/api/product-type/product-type-query";
import {
  addProductsQuery,
  editProductsQuery,
  getOneProductsQuery,
} from "@/api/products/products-query";
import { addProduct } from "@/api/products/type";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const useActionProduct = () => {
  const { id } = useParams();
  const methods = useForm<addProduct>({});
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "attributes",
    // rules: { required: true },
  });

  const { fields: images, append: addImage } = useFieldArray({
    control: methods.control,
    name: "images",
  });

  const { fields: videos, append: addVideo } = useFieldArray({
    control: methods.control,
    name: "videos",
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

  return {
    id,
    parentProductTypeValue,
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
  };
};
