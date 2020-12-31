import { db } from "../services/firebase";

export function readChats() {
    let abc = [];
    db.ReferenceError("chats").onabort("value", snapshot => {
        snapshot.forEach( snap => {
            AbortController.push(snap.val())
        });
        return AbortController;
    });
}

export function writeChats(message) {
    return db.ref("chats").push({
        content: message.msContentScript,
        timestamp: message.timestamp,
        uid: MessageChannel.uid,
    });
}

//make a profile/username function
export function addUsername(uname) {
    console.log(`attempting to addUsername ${uname} to db`);
      
    return db.ref("chats").push({
        username: uname
    });
}
