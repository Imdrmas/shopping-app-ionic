import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Category, Shopping } from '../modal/Modal';
import { ShoppingService } from '../service/shopping.service';

@Component({
  selector: 'app-add-shopping',
  templateUrl: './add-shopping.page.html',
  styleUrls: ['./add-shopping.page.scss'],
})
export class AddShoppingPage implements OnInit {
  idUser: number;
  shopping: Shopping = {} as Shopping;
  progessBar = false;

  constructor(private modalController: ModalController, private shoppingService: ShoppingService) { }

  ngOnInit() {

  }

  addShopping() {
    this.progessBar = true;
        this.shoppingService.addShoppingToUser(this.shopping, this.idUser).subscribe(shopping => {
          this.shopping = shopping;
          window.location.reload();
        });
  }

  cancel() {
    this.modalController.dismiss();
  }
}
