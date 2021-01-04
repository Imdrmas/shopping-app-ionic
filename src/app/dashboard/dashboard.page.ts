import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddCategoryPage } from '../add-category/add-category.page';
import { AddProductPage } from '../add-product/add-product.page';
import { AddShoppingPage } from '../add-shopping/add-shopping.page';
import { Category, User } from '../modal/Modal';
import { ShoppingService } from '../service/shopping.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  username: string;
  user: User = {} as User;
  shoppings: any[];
  categories: any[];
  showIndex =- 1;
  categoryLength: number;

  sliderConfig = {
    spaceBetween: 20,
     centeredSlides: true,
     slidesPerView: 1.6
   };

  constructor(private route: ActivatedRoute, public modalController: ModalController, 
    private userService: UserService, private shoppingService: ShoppingService, private router: Router) { }

  ngOnInit() {
    this.username = this.route.snapshot.params.username;
    this.userService.findUserByUsername(this.username).subscribe(user => {
      this.user = user;
      this.userService.findShoppingToUser(this.user.id).subscribe(shoppings => {
        this.shoppings = shoppings;
      })
    });
    
  }
  toggle(item: any, id: number, index: any) {
    item.expanded = !item.expanded;
    this.showIndex = index;
    this.shoppingService.findCategoriesToShopping(id).subscribe(categories => {
      this.categories = categories;
      this.categoryLength = this.categories.length;
    });
  }

  async addShopping(idUser: number) {
    const modal = await this.modalController.create({
      component: AddShoppingPage,
      swipeToClose: true,
      componentProps: {idUser}
    });
    return await modal.present();
  }

  async addCategory(idShopping: number) {
    const modal = await this.modalController.create({
      component: AddCategoryPage,
      swipeToClose: true,
      componentProps: {idShopping}
    });
    return await modal.present();
  }

 async addProduct(idCategory: number) {
  const modal = await this.modalController.create({
    component: AddProductPage,
    swipeToClose: true,
    componentProps: {idCategory}
  });
  return await modal.present(); 
 }

 logout(id: number) {
    this.userService.signOut();
    this.router.navigateByUrl("/login")
 }
}
