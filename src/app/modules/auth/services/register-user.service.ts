import { Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {
  private _roleId: number = 0;
  private currentUser = new BehaviorSubject<any>("");
  private loggedIn=new BehaviorSubject('');

  loggedIn$ = this.loggedIn.asObservable();

  @Input() get roleId() {
    return this._roleId;
  }
  set roleId(val: number) {
    this._roleId = val;
  }

  currentUser$ = this.currentUser.asObservable();

  registerUser(user: any) {
    localStorage.setItem("ni-user", JSON.stringify(user));
    this.changeUser();
  }

  public getUser() {
    const user: string = localStorage.getItem("ni-user");
    return (JSON.parse(user));
  }
  public clearUser() {
    localStorage.removeItem("ni-user");
    this.changeUser();
  }

  isLoggedIn() {
    let result = false;
    const user = localStorage.getItem("ni-user");
    if (user) {
      // this.loggedIn.next(user);
      result = true;
    } else {
      result=false;
      // this.clearUser();
    }
    return result;
  }

  changeUser() {
    if (this.isLoggedIn()) {
      const storedUser = localStorage.getItem("ni-user") || null;
      const user: any = JSON.parse(storedUser) || null;
      this.currentUser.next(user);
    } else {
      this.roleId = 0;
      this.currentUser.next(null);
    }
  }

  getCurrentUser() {
    if (this.isLoggedIn()) {
      const storedUser = localStorage.getItem("ni-user") || null;
      const user: any = JSON.parse(storedUser) || null;
      return user;
    } else {
      return null;
    }
  }

  constructor() { }
}
