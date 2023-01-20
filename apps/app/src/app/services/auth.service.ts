import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
  User,
} from '@angular/fire/auth';
import { catchError, from, map, NEVER, Observable, take, tap, timestamp } from 'rxjs';
import { Router } from '@angular/router';
import { addDoc, doc, Firestore } from '@angular/fire/firestore';
import { collection, setDoc, Timestamp } from '@firebase/firestore';
import { PokeUser } from '../models/user';
import { ballsStats } from '../pages/hunt/models/pokeball';
import { generateNewUser } from '../utils/generateNewUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$: Observable<boolean> = authState(this.auth).pipe(
    map((user) => !!user)
  );
  user$: Observable<User | null> = authState(this.auth);


  constructor(private readonly auth: Auth, private router: Router, private readonly firestore: Firestore) {}

  signIn(email: string, password: string) {
    from(signInWithEmailAndPassword(this.auth, email, password))
      .pipe(
        catchError(() => {
          this.displayFailedPopup();
          return NEVER;
        }),
        take(1)
      )
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }

  register(username: string, email: string, password: string) {
    from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        catchError((err) => {
          console.log(err);
          this.displayFailedPopup();
          return NEVER;
        }),
        take(1)
      )
      .subscribe((creds) => {
        setDoc(doc(this.firestore, "users", creds.user.uid), generateNewUser(creds.user.uid, username))
        this.router.navigateByUrl('/');
      });
  }

  private displayFailedPopup() {
    console.log('Login failed');
    return;
  }

  signOut() {
    from(signOut(this.auth))
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl('/'));
  }
}
