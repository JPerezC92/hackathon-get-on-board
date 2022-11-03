import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";


export const createUserJob = async (userId:string) => {
	await setDoc(doc(db, "userJobs", userId), {});
}