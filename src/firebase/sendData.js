import {
  doc,
  addDoc,
  collection,
  setDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "./authentication";

export const sendProduct = async (nome, categ, link, valor) => {
  try {
    const category = categ;
    console.log(category)
    const docRef = await addDoc(collection(doc(db, "products", category), "items"), {
      name: nome,
      category: categ,
      link: link,
      price: valor,
      status: "active",
    });
    console.log("Produto adicionado com ID: ", docRef.id);
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
  }
};

export const sendCategory = async (categ) => {
  try {
    const docRef = await setDoc(doc(db, "products", categ), {
      status: "active",
    });
    console.log("Produto adicionado com ID: ", docRef.id);
  } catch (error) {
    console.log(error);
  }
};