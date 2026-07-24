import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { app } from "./firebase";

let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

export function getFirebaseDb(): Firestore {
  if (!dbInstance) {
    dbInstance = getFirestore(app as any);
  }
  return dbInstance;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!storageInstance) {
    storageInstance = getStorage(app as any);
  }
  return storageInstance;
}

export { app };
