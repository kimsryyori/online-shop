import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

import {
  auth,
  db
} from "../firebase/firebase";


const AuthContext = createContext();


export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  // ==========================================
  // Listen to Firebase Authentication
  // ==========================================

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {

        try {

          if (firebaseUser) {

            // Get user document from Firestore
            const userRef = doc(
              db,
              "users",
              firebaseUser.uid
            );

            const userSnap = await getDoc(
              userRef
            );


            if (userSnap.exists()) {

              setUser({
                uid: firebaseUser.uid,
                ...userSnap.data()
              });

            } else {

              // Firebase user exists,
              // but Firestore profile doesn't exist
              setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email
              });

            }

          } else {

            // User logged out
            setUser(null);

          }

        } catch (error) {

          console.error(
            "Auth state error:",
            error
          );

          setUser(null);

        } finally {

          setLoading(false);

        }

      }
    );


    // Cleanup listener
    return unsubscribe;

  }, []);


  // ==========================================
  // REGISTER
  // ==========================================

  const register = async (
    name,
    email,
    password
  ) => {

    try {

      // Create Firebase Authentication account
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );


      const firebaseUser =
        userCredential.user;


      // Create user document in Firestore
      await setDoc(
        doc(
          db,
          "users",
          firebaseUser.uid
        ),
        {
          uid: firebaseUser.uid,
          name: name,
          email: email,
          role: "customer",
          createdAt: new Date()
        }
      );


      return {
        success: true
      };


    } catch (error) {

      console.error(
        "Register error:",
        error
      );


      return {
        success: false,
        message: getFirebaseErrorMessage(
          error.code
        )
      };

    }

  };


  // ==========================================
  // LOGIN
  // ==========================================

  const login = async (
    email,
    password
  ) => {

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


      return {
        success: true
      };


    } catch (error) {

      console.error(
        "Login error:",
        error
      );


      return {
        success: false,
        message: getFirebaseErrorMessage(
          error.code
        )
      };

    }

  };


  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = async () => {

    try {

      await signOut(auth);

      return {
        success: true
      };

    } catch (error) {

      console.error(
        "Logout error:",
        error
      );

      return {
        success: false,
        message: error.message
      };

    }

  };


  // ==========================================
  // Firebase Error Messages
  // ==========================================

  function getFirebaseErrorMessage(code) {

    switch (code) {

      case "auth/email-already-in-use":
        return "This email is already registered.";

      case "auth/invalid-email":
        return "Invalid email address.";

      case "auth/weak-password":
        return "Password is too weak.";

      case "auth/invalid-credential":
        return "Invalid email or password.";

      case "auth/user-not-found":
        return "User not found.";

      case "auth/wrong-password":
        return "Incorrect password.";

      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";

      default:
        return "Something went wrong. Please try again.";

    }

  }


  // ==========================================
  // Provider
  // ==========================================

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}


// ==========================================
// useAuth Hook
// ==========================================

export function useAuth() {

  return useContext(AuthContext);

}