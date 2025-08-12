import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCSR2TiaMwWx-NY9BVpHM2PbxannEBzlNU',
  authDomain: 'fakhry-showcase-v2.firebaseapp.com',
  projectId: 'fakhry-showcase-v2',
  storageBucket: 'fakhry-showcase-v2.firebasestorage.app',
  messagingSenderId: '686700373210',
  appId: '1:686700373210:web:5b9c63f4e214511ae171e3',
  measurementId: 'G-29VSW7CMFR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics };
