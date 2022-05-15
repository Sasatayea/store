import { db } from "../Config";
import {
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import { getFirestore } from "firebase/firestore";
// Get a list of cities from your database
import { app } from "../Config";

const firestoreDB = getFirestore(app);
async function getUsers() {
  const usersCol = collection(db, "users");
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return userList;
}

  async function getUserById(id) {
  const usersRef = collection(firestoreDB, "users");
  const q = query(usersRef, where("id", "==", id));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
      return {id: doc.id, ...doc.data()};
  });
}

async function editUser(user) {
  console.log("at editCity", user);
  await setDoc(doc(db, "users", user.id), user);
}

async function deleteUser(user) {
  try {
    await deleteDoc(doc(db, "users", user));
    console.log("Document deleted with ID: ", user);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}



async function addUser(user) {
  await setDoc(doc(firestoreDB, "users", user.id), user);
}

function subscribeUser(callback) {
  const unsubscribe = onSnapshot(
    query(collection(db, "users")),
    (snapshot) => {
      const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
      snapshot.docChanges().forEach((change) => {
        // console.log("changes", change, snapshot.metadata);
        if (callback) callback({ change, snapshot });
      });
      // console.log(source, " data: ", snapshot.data());
    }
  );
  return unsubscribe;
}

export { getUsers, addUser, editUser, deleteUser, subscribeUser,getUserById };