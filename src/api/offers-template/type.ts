// types.ts

// Type for an Offers Template
export type OffersTemplate = {
  _id: string;
  name: string;
  numOfVariables: number;
  __v: number;
};

// Type for the "get offers templates" response
export type GetOffersTemplatesResponse = {
  success: boolean;
  count: number;
  data: OffersTemplate[];
};

// Type for the "add offers template" request body
export type AddOffersTemplateRequest = {
  name: string;
  numOfVariables: number;
};
