import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddShoppingPageRoutingModule } from './add-shopping-routing.module';

import { AddShoppingPage } from './add-shopping.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddShoppingPageRoutingModule
  ],
  declarations: [AddShoppingPage]
})
export class AddShoppingPageModule {}
