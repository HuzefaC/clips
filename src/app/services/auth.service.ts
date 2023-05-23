import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';
// @ts-ignore
import firebase from '$GLOBAL$';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated$: Observable<boolean>;
  private usersCollection: AngularFirestoreCollection<IUser>;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.usersCollection = this.db.collection<IUser>('users');
    this.isAuthenticated$ = auth.user.pipe(map((user) => !!user));
  }

  public async registerUser(userData: IUser) {
    if (!userData.password) {
      throw new Error('Password not provided!');
    }
    const userCredential = await this.createUser(
      userData.email,
      userData.password
    );
    if (!userCredential.user?.uid) {
      throw new Error("User can't be found");
    }
    await this.saveUser(userData, userCredential.user?.uid);
    await this.updateUserProfile(userCredential, userData.name);
  }

  private async updateUserProfile(
    userCredential: firebase.auth.UserCredential,
    displayName: string
  ) {
    await userCredential.user.updateProfile({
      displayName: displayName,
    });
  }

  private async saveUser(userData: IUser, uid: string) {
    await this.usersCollection.doc(uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });
  }

  private async createUser(email: string, password: string) {
    return await this.auth.createUserWithEmailAndPassword(email, password);
  }
}
