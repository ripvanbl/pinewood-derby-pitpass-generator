import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }
  
  clear(): void {
    sessionStorage.clear();
  }
  
  getItem(token: string): any {
    let item = sessionStorage.getItem(token); 
    if(item) {
      return JSON.parse(item);
    }
  }
  
  removeItem(token: string): void {
    sessionStorage.removeItem(token);
  }
  
  setItem(token: string, val: any): void {
    if(val) {
      val = JSON.stringify(val);
    }
    
    sessionStorage.setItem(token, val);
  }
}
