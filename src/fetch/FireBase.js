import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc,setDoc, updateDoc, doc } from 'firebase/firestore/lite';
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
    console.log(round)
    const a = await getRounds();
    console.log(a)

   // await setDoc(doc(db, "cities", "new-city-id"), data);
    // try {
    //     //const docRef = await addDoc(collection(db, "rounds"), {lastValidKey:JSON.stringify(round)}); 
    //     const docRef = await setDoc(doc(db, "rounds", "434565"), {'LAST':JSON.stringify(round)}); 
    //     console.log("Round salvo no fireBase com o ID: ");
    //   } catch (e) {
    //     console.error("Erro so salvar Round no fireBase: ", e);
    //   }
      //const washingtonRef = doc(collection(db, "rounds"));
     const washingtonRef = doc(db, "rounds", "434565");
    //   console.log(washingtonRef)

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  "LAST":JSON.stringify(round)
});
  }


  export async function getRounds() {
    const citiesCol = collection(db, 'rounds');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log('Rounds salva no fireBase: ')
   // console.log(JSON.parse(cityList[7]['validKey']));
    console.log(cityList);
    console.log( JSON.parse(
        cityList.find((city)=> Object.keys(city)[0] === 'LAST' )['LAST']
    ) );
     return JSON.parse(cityList.find((city)=> Object.keys(city)[0] === 'LAST' )['LAST']) ;
    //return 'a';
  }
  
