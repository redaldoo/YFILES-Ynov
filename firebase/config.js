import firebase from 'firebase/app'
require('firebase/auth')
const firebaseConfig = {
    apiKey: "AIzaSyD86_3K4ZEz5TeFX10JfHa-LrhQKoW34Eo",
    authDomain: "appstorage.firebaseapp.com",
    databaseURL: "https://appstorage.firebaseio.com",
    projectId: "appstorage",
    storageBucket: "appstorage.appspot.com",
    messagingSenderId: "51759056005",
    appId: "1:51759056005:android:15279136bcdeee660c15ec"
};

firebase.initializeApp(firebaseConfig);

export default firebase;