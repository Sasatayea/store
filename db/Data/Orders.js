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
async function getOrders() {
  const citiesCol = collection(db, "orders");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return cityList;
}



async function editOrder(city) {
  console.log("at editCity", city);
  await setDoc(doc(db, "orders", city.id), city);
}

async function deleteOrder(city) {
  try {
    await deleteDoc(doc(db, "orders", city));
    console.log("Document deleted with ID: ", city);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

async function addOrder(city) {
  try {
    const docRef = await addDoc(collection(db, "orders"), city);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function subscribeOrders(callback) {
  const unsubscribe = onSnapshot(
    query(collection(db, "orders")),
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



export { getOrders,editOrder, deleteOrder,addOrder,subscribeOrders};
