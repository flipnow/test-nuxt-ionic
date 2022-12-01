import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';

export const useFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAtZJCrStv4HEaFfWsVYVv9EDAS9h6281w',
    authDomain: 'elisashop-a7b5f.firebaseapp.com',
    projectId: 'elisashop-a7b5f',
    storageBucket: 'elisashop-a7b5f.appspot.com',
    messagingSenderId: '406575782095',
    appId: '1:406575782095:web:c4080b6c71808ac072ffba',
    measurementId: 'G-8ELQDVHDM0',
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  const firebaseAuth = initializeAuth(firebaseApp, {
    persistence: indexedDBLocalPersistence,
  });

  return {
    firebaseApp,
    firebaseAuth,
    firestore,
  };
};
