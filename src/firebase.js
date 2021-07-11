import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDaW6uGCIAZqX-l8BUXqDisNduudLnRkE4',
  authDomain: 'linkedin-project-yt.firebaseapp.com',
  projectId: 'linkedin-project-yt',
  storageBucket: 'linkedin-project-yt.appspot.com',
  messagingSenderId: '880932998398',
  appId: '1:880932998398:web:a0bfb5b0e30f2b9e00a9af',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
