import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

  public async registerUser(userData: IUser) {
    await this.createUser(userData.email, userData.password);
    await this.saveUser(userData);
  }

  private async saveUser(userData: IUser) {
    const angularFirestoreCollection = this.db.collection('users');
    await angularFirestoreCollection.add({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });
  }

  private async createUser(email: string, password: string) {
    await this.auth.createUserWithEmailAndPassword(email, password);
  }
}
