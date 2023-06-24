import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, updateDoc, doc } from 'firebase/firestore/lite';

const idOfCurrentPlay = '434565';
const firebaseConfig = {
  apiKey: "AIzaSyBqDFeRDz_HeRM8j2chp5twsYVcKMGDNJY",
  authDomain: "teste-4f17c.firebaseapp.com",
  projectId: "teste-4f17c",
  storageBucket: "teste-4f17c.appspot.com",
  messagingSenderId: "325226819107",
  appId: "1:325226819107:web:27993c5074f3b8bed8cb96",
  measurementId: "G-07FFZ04DJB"
};
const app = initializeApp(firebaseConfig); 
const db = getFirestore(app); //console.log('Firebase iniciado.')

export async function createNewRound(round = ["Job","Jeh","Gih","Victor"] ){
  try {
    await setDoc(doc(db, "rounds", String(Number(idOfCurrentPlay)+1)), {'LAST':JSON.stringify(round)}); 
    console.log("Adicionado novo jogo no fireBase.");
  } catch (e) {
    console.error("Erro so adicionar novo jogo fireBase: ", e);
  }
} 

export async function updateRounds(round = ["Job","Jeh","Gih","Victor"]){
  const actualCollumRef = doc(db, "rounds", idOfCurrentPlay);
  await updateDoc(actualCollumRef, {
    "LAST":JSON.stringify(round)
  });
}

export async function getRounds() {
  const roundsCol = collection(db, 'rounds');
  const roundSnapshot = await getDocs(roundsCol);
  const roundList = roundSnapshot.docs.map(doc => doc.data());

  return JSON.parse(
    roundList.find((city)=> Object.keys(city)[0] === 'LAST' )['LAST']
  ) ;
}
