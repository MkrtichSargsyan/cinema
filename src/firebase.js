import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';



const config = {
    apiKey: "AIzaSyBUm1RJYmvPNG_LNLB_fry4Vck_gEcXSvQ",
    authDomain: "cinema-d6789.firebaseapp.com",
    databaseURL: "https://cinema-d6789.firebaseio.com",
    projectId: "cinema-d6789",
    storageBucket: "cinema-d6789.appspot.com",
    messagingSenderId: "702522303086"
};
firebase.initializeApp(config);


const firedb = firebase.database();
const auth = firebase.auth();



export {
    firedb,
    firebase,
    auth
}