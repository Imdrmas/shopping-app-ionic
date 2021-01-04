import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, User } from '../modal/Modal';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  carts: Cart[];
  idUser: number;
  user: User = {} as User;
  total: number;

  constructor(private userService: UserService, private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
    this.idUser = this.route.snapshot.params.idUser;
    this.userService.findCartsToUser(this.idUser).subscribe(carts => {
      this.carts = carts;
      this.total = this.carts.reduce((a, b) => a + (b.count * b.price), 0);
    });
    this.userService.findUserById(this.idUser).subscribe(user => {
     this.user = user;
    });
  }
  logout(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
     this.userService.signOut();
     this.router.navigateByUrl("/login")
     console.log('User delete sucessfully');
   });
  }
}
