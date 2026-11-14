
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./firebase";

const favoritesCollection = collection(db, "favorites");

// Get all saved favorite breeds
export async function getFavorites() {
  const snapshot = await getDocs(favoritesCollection);

  return snapshot.docs.map((item) => ({
    ...item.data(),
    id: item.id,
  }));
}

// Save a breed to Firestore
export async function saveFavorite(breed) {
  await setDoc(doc(db, "favorites", breed.id), {
    id: breed.id,
    name: breed.name,
    description: breed.description,
    imageUrl: breed.imageUrl,
    life: breed.life || null,
    hypoallergenic: breed.hypoallergenic,
    imageAttribution: breed.imageAttribution || null,
  });
}

// Delete a favorite breed
export async function removeFavorite(breedId) {
  await deleteDoc(doc(db, "favorites", breedId));
}
