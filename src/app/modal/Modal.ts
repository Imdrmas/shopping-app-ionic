export class Cart {
 id: number;
 name: string;
 count: number;
 total: number;
 added: any;
 products: Product[];
}

export class Category {
  id: number;
  name: string;
  products: Product[];
}

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  created: any;
}

export class Shopping {
    id: number;
    expanded: boolean;
    categories: Category[];
}

export class User {
  id: number;
  username: string;
  password: string;
  admin: boolean;
  carts: Cart[];
  shoppings: Shopping[];
}