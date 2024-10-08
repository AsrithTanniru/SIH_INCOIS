import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBD9hkkL7UwlQJczz13lweuxwg66TxCGs4",
  authDomain: "shore-alert-f0a9b.firebaseapp.com",
  projectId: "shore-alert-f0a9b",
  storageBucket: "shore-alert-f0a9b.appspot.com",
  messagingSenderId: "238621949666",
  appId: "1:238621949666:web:d995adc47214fc19fea8bb"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
console.log('Firestore initialized:', firestore);
