import { auth } from "../Config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithCredential,
  FacebookAuthProvider,
  
} from "firebase/auth";
import { addUser } from "../../db/cities/users";
// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

async function register(email, password) {
  await createUserWithEmailAndPassword(auth, email, password);
  addUser({email:email,password:password,money:50000,cart:[],sold:[]});
}

async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}
async function logout() {
  await auth.signOut();
}

export { register, login,logout };
