import * as firebase from 'firebase/app';

export class User {
    displayName: string;
    email: string;
    photoURL: string;
    uid: string;
    
    constructor(public fbUser: firebase.User = null) {
        if(!fbUser) return;
        
        this.displayName = fbUser.displayName;
        this.email = fbUser.email;
        this.photoURL = fbUser.photoURL;
        this.uid = fbUser.uid;
    }
}