import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./authentication";

export const sendProduct = async (nome, categ, link, valor) => {
    try {
      await setDoc(doc(db, "products", categ), {
        name: nome,
        category: categ,
        link: link,
        price: valor,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
