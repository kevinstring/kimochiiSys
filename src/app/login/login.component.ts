import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToastModule } from 'primeng/toast';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,ReactiveFormsModule,FormsModule,ToastModule],
})
export class LoginComponent  implements OnInit {
  loginForm: FormGroup;
token:any;
usuarioIncorrecto=false;
loading=false;
  constructor(private servicio:ServicioService,private router:Router,private fb: FormBuilder) { }

  
  ngOnInit() {  this.loginForm = this.fb.group({
    nickname: ['', Validators.required],
    password: ['', Validators.required],
  });}
  onSubmit(){
    this.loading=true;
    const form = new FormData();
    form.append('nickname',this.loginForm.value.nickname);
      form.append('password',this.loginForm.value.password);

    this.servicio.post('login',form).subscribe((res:any)=>{
      console.log(res);
      if(res.status=="success") {
        this.loading=false;
      this.token=res.token;
      localStorage.setItem('token',this.token);

        this.router.navigate(['/']);
      }else{
        this.loading=false;
        this.usuarioIncorrecto=true;
      }
    }
    )
      
  }

}
