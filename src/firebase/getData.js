import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./authentication";

export const getUserType = async () => {
  const user = auth.currentUser;

  if (!user) {
    return null; 
  }

  try {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Documento não encontrado.");
    }

    const userData = docSnap.data();
    return userData.tipo;
  } catch (error) {
    console.error("Erro ao obter o tipo de usuário:", error.message);
    throw new Error("Erro ao buscar os dados do usuário."); 
  }
};
