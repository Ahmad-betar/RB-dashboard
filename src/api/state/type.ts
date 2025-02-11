export interface editStateFormType {
  firstKiloDeliveryCost: number;
  deliveryCostPerKilo: number;
}
export interface addStateFormType extends editStateFormType {
  name: string;
}

export interface editStatesType {
  _id: string;
  firstKiloDeliveryCost: number;
  deliveryCostPerKilo: number;
}

export interface getStatesType extends editStatesType {
  name: string;
}
