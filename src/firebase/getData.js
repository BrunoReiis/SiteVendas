import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const db = getDatabase();
const auth = getAuth();

const GetUserNav = async (user) =>{
    const q = query(collection(db, "cities"), where("capital", "==", true));

    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
});

}

export {
    GetUserNav
}