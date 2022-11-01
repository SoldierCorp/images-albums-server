import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from '../../sectorgeek-albums-firebase-adminsdk-d2psw-6723d77a24.json'
import dotenv from 'dotenv'

dotenv.config()

initializeApp({
  credential: cert(serviceAccount as ServiceAccount)
})

const db = getFirestore();

export {
  db
}
