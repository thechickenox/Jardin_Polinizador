import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.class';
import { ToastController } from '@ionic/angular';
import { Icon } from 'ionicons/dist/types/components/icon/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  user: User = new User
  constructor(private router: Router, private authSvc: AuthService,private toastController: ToastController) { }

  ngOnInit() {
  }

  async onLogin(){
    try{
    const user = await this.authSvc.onLogin(this.user);
    if(user) {
      this.presentToast('Usuario logueado correctamente', 'bottom','primary');
      this.router.navigateByUrl('/dashboard');
    }
   } catch (error) {
    const err = JSON.stringify(error)
    const errX = JSON.parse(err)
    this.errorToast('Error ingrese datos correctos', 'bottom','danger')

  }
  }
  async presentToast(error: string,position: 'top' | 'middle' | 'bottom',color:'primary' ) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2500,
      position: position,
      color:color,
      icon: 'checkmark-outline'
      
      
    });

    await toast.present();
  }
  async errorToast(error: string,position: 'top' | 'middle' | 'bottom',color:'danger' ) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2500,
      position: position,
      color:color,
      icon: 'alert-outline'
    });

    await toast.present();
  }
  

  async onNewUser(){
      this.router.navigateByUrl('/registration');
  }

}