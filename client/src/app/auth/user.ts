import * as firebase from 'firebase/app';

export class User {
    displayName: string;
    email: string;
    isAnonymous: boolean;
    photoURL: string;
    uid: string;

    constructor(public firebaseUser: firebase.User = null) {
        if (!firebaseUser) { return };

        this.displayName = firebaseUser.displayName;
        this.email = firebaseUser.email;
        this.isAnonymous = firebaseUser.isAnonymous;
        this.photoURL = firebaseUser.photoURL;
        this.uid = firebaseUser.uid;
    }
}
