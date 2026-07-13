import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, runTransaction } from 'firebase/database';

// Replace these placeholders with your real Firebase config values
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

let db = null;
let useFirebase = false;

// Check if the user has replaced the default placeholders
if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY") {
  try {
    const app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    useFirebase = true;
    console.log("Firebase Database initialized successfully!");
  } catch (error) {
    console.error("Firebase initialization failed, falling back to localStorage:", error);
  }
}

// Get the live global likes count
export const subscribeToLikes = (callback) => {
  if (useFirebase && db) {
    const likesRef = ref(db, 'likes/count');
    return onValue(likesRef, (snapshot) => {
      const data = snapshot.val();
      callback(data !== null ? data : 38);
    }, (error) => {
      console.warn("Failed to read from Firebase, using localStorage:", error);
      callback(getLocalLikes());
    });
  } else {
    // Local fallback
    callback(getLocalLikes());
    // Return dummy unsubscribe function
    return () => {};
  }
};

// Increment global likes count
export const incrementLikes = (isLiked) => {
  const diff = isLiked ? 1 : -1;
  
  if (useFirebase && db) {
    const likesRef = ref(db, 'likes/count');
    runTransaction(likesRef, (currentCount) => {
      if (currentCount === null) return 38 + diff;
      return currentCount + diff;
    }).catch(err => {
      console.warn("Failed to transaction increment in Firebase:", err);
      updateLocalLikes(diff);
    });
  } else {
    updateLocalLikes(diff);
  }
};

// Local storage helpers
const getLocalLikes = () => {
  const saved = localStorage.getItem('aditya_portfolio_likes');
  if (saved === null) {
    localStorage.setItem('aditya_portfolio_likes', '38');
    return 38;
  }
  return parseInt(saved, 10);
};

const updateLocalLikes = (diff) => {
  const current = getLocalLikes();
  const nextVal = Math.max(0, current + diff);
  localStorage.setItem('aditya_portfolio_likes', nextVal.toString());
};
