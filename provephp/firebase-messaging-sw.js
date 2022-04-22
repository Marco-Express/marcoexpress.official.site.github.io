import { } from "https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js"
import { } from "https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js"

const firebaseConfig = {
    apiKey: "AIzaSyCIw0-w1C3zDjoGgVpLKsFYm2TFXqJr9yw",
    authDomain: "marco-express-d30c8.firebaseapp.com",
    databaseURL: "https://marco-express-d30c8-default-rtdb.firebaseio.com",
    projectId: "marco-express-d30c8",
    storageBucket: "marco-express-d30c8.appspot.com",
    messagingSenderId: "764621319758",
    appId: "1:764621319758:web:9390a4a994df27cda4dd1f",
    measurementId: "G-3ZK6NW0G3F"
};

    const app = initializeApp(firebaseConfig);
const messaging=firebase.messaging();

messaging.setBackroundMessageHandler(function (payload) {
    console.log(payload);
})