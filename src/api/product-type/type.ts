export interface getParentProductType {
  productTypes: {
    _id: string;
    name: string;
    parentProductType: string;
  }[];
}

export interface addProductTypeForm {
  names: string[];
  imageUrl: string;
  parentProductTypeId: string | null;
}
