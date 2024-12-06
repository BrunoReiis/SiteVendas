import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "./authentication";

export const deleteCategory = async (category) =>{
    try {
        await deleteDoc(doc(db, "products", category));
    } catch (error) {
        console.log(error)
    }
}