export interface getProductParams {
  search: string;
  page: number;
  sort: string;
  limit: number;
  minPrice: number;
  maxPrice: number;
  sizes: number;
  productType: string;
}
