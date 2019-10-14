const productcategory = [
  {
    id: 1,
    productCategory: "Machine"
  },
  {
    id: 2,
    productCategory: "Ventilator"
  },
  {
    id: 3,
    productCategory: "ICU equipment"
  },
  {
    id: 4,
    productCategory: "Surgery tools"
  },
  {
    id: 5,
    productCategory: "Icu infra"
  },
  {
    id: 6,
    productCategory: "Medicines"
  },
  {
    id: 7,
    productCategory: "Medical software"
  },
  {
    id: 8,
    productCategory: "Heart studs"
  },
  {
    id: 9,
    productCategory: "Branchy therapy equipment"
  },
  {
    id: 10,
    productCategory: "scanners"
  }
];

const products = [
  {
    id: 1,
    category: "scanners",
    description: "High resolution ct scanner",
    name: "CT scanner",
    price: 1000000,
    quantity: "1"
  },
  {
    category: "scanners",
    description: "Big Bore MRI scanner",
    name: "MRI Scanner",
    price: 2332,
    quantity: "2",
    createdAt: 1566670687208,
    id: 2
  }
];

const vendors = [
  {
    "name": "Sample vendor",
    "phoneNumber": "8888888888",
    "contactName": "vendor1",
    "address": "hyd",
    "email": "vendor1@gmail.com",
    "website": "www.commerce.com",
    "remarks": "ddd",
    "createdAt": 1568218753042,
    "id": 1
  }
];

const departments = [
  {
    "id": 1,
    "departmentName": "Dept-1",
    "contactName": "person-1",
    "phoneNumber": 8888888888
  }
]

const purchaseOrders = [];

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  productcategory,
  products,
  vendors,
  purchaseOrders,
  departments
};
