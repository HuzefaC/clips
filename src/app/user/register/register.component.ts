import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import IUser from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  showAlert: boolean = false;
  inSubmission: boolean = false;
  alertMsg: string = 'Please wait! Your account is being created.';
  alertColor: string = 'blue';
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
  ]);
  email = new FormControl('', [Validators.required, Validators.email]);
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(15),
    Validators.max(100),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
  ]);
  confirmPassword = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
  ]);
  registerForm: FormGroup = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber,
  });

  constructor(private authService: AuthService) {}

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this.authService.registerUser(this.registerForm.value as IUser);
      this.alertMsg = 'Success! Your account has been created!';
      this.alertColor = 'green';
    } catch (e) {
      console.error(e);
      this.alertMsg = 'An unexpected error occurred. Please try again!';
      this.alertColor = 'red';
      this.inSubmission = false;
    }
  }
}
