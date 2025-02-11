export const API_ROUTES = {
  product: {
    get: "products",
    create: "admin/product",
    edit: "admin/product/",
    delete: "api/product/",
    getOne: "product/",
  },

  productType: {
    getParent: "parentProductTypes",
    getChildren: "childrenProductTypes/",
    create: "admin/productTypes",
    delete: "admin/productTypes",
  },

  location: {
    state: {
      get: "states",
      getOne: "state",
      create: "admin/state",
      delete: "admin/state/",
      edit: "admin/state/",
    },

    governorates: {
      getOne: "governorates/",
      add: "admin/governorate",
      delete: "admin/governorate/",
    },

    city: {
      getOne: "cities/",
      add: "admin/city",
      delete: "admin/city/",
    },
  },

  coupon: {
    get: "admin/coupons", //params
    add: "admin/coupon",
    delete: "admin/coupon/",
  },
};
