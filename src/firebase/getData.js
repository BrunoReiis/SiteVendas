import { collection, query, where, getDoc, doc } from "firebase/firestore";
import { auth, db } from "./authentication";

export const getUserType = async () => {
  const user = auth.currentUser;
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
      throw new Error("Documento não encontrado.");
  }

  const userData = docSnap.data();
  return userData.tipo;
};
