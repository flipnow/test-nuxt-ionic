import { useFirebase } from '~~/composables/useFirebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';

export function useAuth() {
  const user = useState();
  const loading = useState(() => false);

  const initAuth = () => {
    const { firebaseAuth } = useFirebase();
    onAuthStateChanged(firebaseAuth, (u) => {
      loading.value = false;
      user.value = u;
    });
  };

  const signIn = async (email: string, password: string) => {
    const { firebaseAuth } = useFirebase();
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signOut = () => {
    const { firebaseAuth } = useFirebase();
    firebaseSignOut(firebaseAuth);
  };

  return {
    user,
    loading,
    initAuth,
    signIn,
    signOut,
  };
}
