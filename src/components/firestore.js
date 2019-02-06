
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAakunoEMJu8OQioMksE_9gTz_OC7QzmrE",
    authDomain: "itinerary-app-f889d.firebaseapp.com",
    databaseURL: "https://itinerary-app-f889d.firebaseio.com",
    projectId: "itinerary-app-f889d",
    storageBucket: "itinerary-app-f889d.appspot.com",
    messagingSenderId: "659846084112"
}

firebase.initializeApp(config);

const firestore = firebase.firestore();

export default firestore;