import { auth } from "../services/firebase";
import { addUsername } from "./db";

export function signup(username, email, password) {

    console.log(username, email, password)

    //can only have await in an async fn
    // try{
    //     await addUsername(username);
    // } catch (error) {
    //     console.log({error: error});
    // }
    return(
        auth().createUserWithEmailAndPassword(email, password)
       //was here with a comma - , addUsername, clg
    )
}
  
export function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}

// export function addUName(uname) {
//     console.log(`addUName is trying to add ${uname} to the database`)
//     //do something here. not sure how to "word it"
//     return auth().updateCurrentUser({username: uname})
// }

export function signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
}
  
  export function signInWithGitHub() {
    const provider = new auth.GithubAuthProvider();
    return auth().signInWithPopup(provider);
}
  
  export function logout() {
    return auth().signOut();
}

//not sure where this goes - came from josh
// async googleSignIn() {
//     try {
//       await signInWithGoogle();
//     } catch (error) {
//       this.setState({ error: error.message });
//     }
//   }
