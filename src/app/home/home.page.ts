import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../modal/Modal';
import { ShoppingService } from '../service/shopping.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  cart = [];
  user: User = {} as User;
  showIndex =- 1;
  productLength: number;
  username: string;

  constructor(private userService: UserService, private shoppingService: ShoppingService, private router: Router, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cart = this.shoppingService.getCart();   
    this.username = this.route.snapshot.params.username;

    this.userService.findUserByUsername(this.username).subscribe(user => {
      this.user = user;
    });

    this.shoppingService.findCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  toggle(item: any, id: number, index: any) {
    item.expanded = !item.expanded;
    this.showIndex = index;
     this.shoppingService.findProductsToCategory(id).subscribe(products => {
       this.products = products
       this.productLength = this.products.length;
     });
  }

  addToCart(product: any) {
    this.shoppingService.addProduct(product);
  }

  openCart(idUser: number) {
    this.router.navigate(['/cart/', idUser]);
  }

  logout(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
     this.userService.signOut();
     this.router.navigateByUrl("/login")
     console.log('User delete sucessfully');
   });
  }
}
