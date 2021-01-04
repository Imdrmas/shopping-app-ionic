export class Cart {
 id: number;
 name: string;
 count: number;
 total: number;
 price: number;
 added: any;
}

export class Category {
  id: number;
  name: string;
  logo: string;
  expanded: boolean;
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
    name: string;
    expanded: boolean;
    categories: Category[];
}

export class User {
  id: any;
  username: string;
  password: string;
  admin: boolean;
  carts: Cart[];
  shoppings: Shopping[];
}