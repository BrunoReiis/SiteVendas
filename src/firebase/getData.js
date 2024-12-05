import { doc, getDoc, collection, getDocs } from "firebase/firestore";
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

export const getDataModalProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    if (querySnapshot.empty) {
      return "Não foi possível encontrar produtos";
    }

    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (error) {
    throw new Error("Erro ao buscar dados de produtos");
  }
};

export const getDataModalUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));

    if (querySnapshot.empty) {
      return "Não foi possível encontrar usuários";
    }

    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (error) {
    throw new Error("Erro ao buscar dados de usuários");
  }
};
