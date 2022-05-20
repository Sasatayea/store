import { auth,app } from "../Config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithCredential,
  FacebookAuthProvider,
  getAuth,
} from "firebase/auth";


const authentication = getAuth(app);
import { addUser } from "../Data/Users";
// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});
async function getUserUId() {
  if (authentication.currentUser != null) {
      return authentication.currentUser.uid;
  } else {
      return null;
  }
}

async function register(email, password) {
  await createUserWithEmailAndPassword(auth, email, password);
  
}

async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

async function logout() {
  await auth.signOut();
}

export { register, login, logout,getUserUId };
