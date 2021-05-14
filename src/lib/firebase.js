import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDcsFKek8_xYjqrIQC90HEWa4ECqJ_mVkA',
  authDomain: 'instagram-444a5.firebaseapp.com',
  projectId: 'instagram-444a5',
  storageBucket: 'instagram-444a5.appspot.com',
  messagingSenderId: '442418142155',
  appId: '1:442418142155:web:4d9b82ca1f260b3c7ab44e'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
