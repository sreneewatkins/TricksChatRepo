import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB3VUR_9IaDB5RCx30RufIHW0gwSNFOKDg",
    authDomain: "trickschat-b9395.firebaseapp.com",
    databaseURL: "https://trickschat-b9395-default-rtdb.firebaseio.com"
};
  firebase.initializeApp(config);
  
  export const auth = firebase.auth;
  export const db = firebase.database();

