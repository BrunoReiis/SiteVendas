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
    const categoriesSnapshot = await getDocs(collection(db, "products"));

    if (categoriesSnapshot.empty) {
      return "Não foi possível encontrar categorias";
    }

    const data = [];

    for (const categoryDoc of categoriesSnapshot.docs) {
      const category = categoryDoc.id;
      const productsSnapshot = await getDocs(
        collection(db, "products", category, "items")
      );

      if (productsSnapshot.empty) {
        console.log(`Nenhum produto encontrado na categoria ${category}`);
      }
      productsSnapshot.forEach((productDoc) => {
        data.push({ id: productDoc.id, category, ...productDoc.data() });
      });
    }

    return data;
  } catch (error) {
    console.log(error);
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

export const getDataModelCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw new Error("Erro ao buscar dados de categorias");
  }
};
