import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.class';
import { ToastController } from '@ionic/angular';
import { Colors } from 'chart.js';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {
  user: User = new User();

  constructor(private authSvc: AuthService, private router: Router,private toastController: ToastController) { }

  ngOnInit() {
  }

  async onRegister(){
    try {
      const user = await this.authSvc.onRegister(this.user);
      if(user){
        this.presentToast('Usuario creado con éxito', 'bottom','primary')
        this.router.navigateByUrl('/login');

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

}
