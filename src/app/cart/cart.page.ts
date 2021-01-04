import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, User } from '../modal/Modal';
import { ShoppingService } from '../service/shopping.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  selectedItems:  Cart[];
  total = 0;
  cart: Cart = {} as Cart;
  idUser: number;
  user: User = {} as User;
  product: {};

    constructor(private shoppingService: ShoppingService, private router: Router,
      private route: ActivatedRoute, private userService: UserService) { }
  
    ngOnInit() {
      this.idUser = this.route.snapshot.params.idUser;
      this.userService.findUserById(this.idUser).subscribe(user => {
        this.user = user;
      });
      this.shoppingService.findProducts().subscribe(categories => {
        const selected = {};
        for (const obj of categories) {
          if (selected[obj.id]) {
            selected[obj.id].count++;
          } else {
            selected[obj.id] = {...obj, count: 1};
          }
        }
        this.selectedItems = Object.keys(selected).map(key => selected[key]);
        this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
      });

   }
    
      saveCart(total: number, item: any) {
        this.cart.total = total;
        this.selectedItems.forEach(product => {
          this.cart.name = product.name;
          this.cart.price = product.price;
          this.cart.count = product.count
          this.shoppingService.addCartToUser(this.cart, this.idUser).subscribe(cart => {
            this.cart = cart;
            this.router.navigate(["/profile/", this.idUser]);
          }); 
        })
   }
  home(username: string) {
    this.router.navigate(["/home/", username]);
  }
}
