import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import dotenv from 'dotenv'

dotenv.config()

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID ?? '',
  privateKey: process.env.FIREBASE_PRIVATE_KEY ?? '',
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL ?? '',
}

initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore();

export {
  db
}
