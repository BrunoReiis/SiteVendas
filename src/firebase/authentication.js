import { app } from './firebase';

import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut} from "firebase/auth";
import { setDoc, doc, getFirestore, query, getDocs, where} from "firebase/firestore";
import { useRouter } from 'next/router';

const auth = getAuth(app)
const db = getFirestore(app)

const loginComEmailESenha = async (email, pwd, router) => {
    try {
        await signInWithEmailAndPassword(auth, email, pwd)
    }catch(error){
        alert("Email ou senha invalidos")
    } finally {
        router.push("/dashboard")
    }
}

const registrarComEmailESenha = async (name, email, pwd, router) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, pwd);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            tipo: 2,
            role: "member",
            team: "client",
            status: "active",
        });
    }catch(error){
        alert(error)
    }finally {
        router.push("/dashboard")
    }
}

const recuperarSenha = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Email para recuperação de senha enviado!");
    }catch(error){
        console.log(error)
    }
}

const logout = (router) => {
    signOut(auth);
    router.push("/")
}

export {
    auth,
    db,
    loginComEmailESenha,
    registrarComEmailESenha,
    recuperarSenha,
    logout
}