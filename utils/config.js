module.exports = {
  SCHEMAS: {
    USERS: "users",
    PRODUCTS: "products",
    ORDERS: "orders",
    CART: "carts"
  },
  STATUS_CODES: {
    NOT_FOUND: 404,
    SUCCESS: 200,
    SERVER_ERROR: 500,
    FILE_NOT_FOUND: 404,
    UNAUTHORISED: 401,
  },
  ROUTES: {
    ROOT: "/",
    PAYMENT: {
      PAY: "/pay",
    },
    USER: {
      LOGIN: "/login",
      REGISTER: "/register",
      PROFILE: "/show",
      CHANGE: "/change",
    },
    PRODUCT: {
      CREATE: "/new",
      DISPLAY: "/products",
      FIND: "/search/:title",
      FIND_BY_ID: "/search_by/:id",
      DELETE: "/deleteproduct",
    },
    ORDER: {
      DETAILS: "/order",
      BOOK: "/book",
      CANCEL: "/cancel"
    
    },
    CART: {
      CARTADD: "/addcart",
      CARTVIEW: "/cart",
    }
  },
};
