export const API_ROUTES = {
  product: {
    get: "products",
    create: "admin/product",
    edit: "admin/product/",
    delete: "admin/product/",
    getOne: "product/",
  },

  productType: {
    getParent: "parentProductTypes",
    getChildren: "childrenProductTypes/",
    create: "admin/productType",
    delete: "admin/productTypes/",
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

  orders: {
    get: "admin/orders",
    getOne: "admin/orders/", //params
    status: "orderStatuses",
  },

  customers: {
    get: "admin/customers",
  },

  operator: {
    get: "admin/operators",
    add: "/admin/operator",
    delete: "admin/operator/", //params
  },

  cart: {
    get: "/admin/customerCart/", //params
    odrder: "admin/customerOrder",
    add: "admin/customerCart",
    remove: "admin/customerCart",
    change: "/admin/customerChangeItemQuantity",
  },

  offer: {
    get: "offers",
    getOne: "offer/", //params
    add: "admin/offer",
    delete: "admin/offer/", //params
    edit: "admin/offer/", //params
    manageOfferProducts: "/admin/manageOfferProducts/",
  },

  file: {
    image: "admin/upload/images",
    video: "admin/upload/video",
  },
};
