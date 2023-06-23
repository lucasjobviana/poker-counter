import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBqDFeRDz_HeRM8j2chp5twsYVcKMGDNJY",
    authDomain: "teste-4f17c.firebaseapp.com",
    projectId: "teste-4f17c",
    storageBucket: "teste-4f17c.appspot.com",
    messagingSenderId: "325226819107",
    appId: "1:325226819107:web:27993c5074f3b8bed8cb96",
    measurementId: "G-07FFZ04DJB"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);
  const db = getFirestore(app);
  console.log('jaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa inicializei meuuuuuuus firebase')
  
  
  
  export async function addNewRound(round = ["Job","Jeh","Gih","Victor"]){
    try {
        const docRef = await addDoc(collection(db, "rounds"), {0:round});
        console.log("Round salvo no fireBase com o ID: ", docRef.id);
      } catch (e) {
        console.error("Erro so salvar Round no fireBase: ", e);
      }
  }


  export async function getRounds() {
    const citiesCol = collection(db, 'rounds');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log('Rounds salva no fireBase: ')
    console.log(cityList)
    return cityList;
  }
  
