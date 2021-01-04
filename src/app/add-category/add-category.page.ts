import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from '../modal/Modal';
import { ShoppingService } from '../service/shopping.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {
  idShopping: number;
  category: Category = {} as Category;
  progessBar = false;

  constructor(private modalController: ModalController, private shoppingService: ShoppingService) { }

  ngOnInit() {
  }
  addCategory() {
   this.progessBar = true;
   this.shoppingService.addCategoryToShopping(this.category, this.idShopping).subscribe(category => {
     this.category = category;
     window.location.reload();
   });
 }

 cancel() {
   this.modalController.dismiss();
 }
}
