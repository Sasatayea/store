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
// Get a list of cities from your database
async function getUsers() {
  const citiesCol = collection(db, "products");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return cityList;
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
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function subscribe(callback) {
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

export { getUsers, addUser, editUser, deleteUser, subscribe };