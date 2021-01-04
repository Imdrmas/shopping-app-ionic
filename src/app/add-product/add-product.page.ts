import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from '../modal/Modal';
import { ShoppingService } from '../service/shopping.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
 product: Product = {} as Product;
 idCategory: number;
 progressBar = false;
 
  constructor(private shoppingService: ShoppingService, private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.idCategory);
  }
  addPRoduct() {
    this.progressBar = true;
    this.shoppingService.addProductToCategory(this.product, this.idCategory).subscribe(product => {
      this.product = product;
      window.location.reload();
    });
  }
}
