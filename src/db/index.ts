import type { Image } from '../actions/types'
import { db } from '../config/firebase';

const insertImages = async (username: string, images: Image[]) => {
  const docRef = db.collection(username);
  for (const image of images) {
    await docRef.doc().set(image);
  }
}

const getLastImages = async (username: string): Promise<Image[]> => {
  const snapshot = await db.collection(username).orderBy('created_at', 'desc').limit(10).get();
  let savedImages: Image[] = []
  snapshot.forEach((doc: any) => {
    savedImages = [...savedImages, doc.data() as Image]
  });

  return savedImages
}

const getImages = async (username: string): Promise<Image[]> => {
  const snapshot = await db.collection(username).get();
  let savedImages: Image[] = []
  snapshot.forEach((doc: any) => {
    savedImages = [...savedImages, doc.data() as Image]
  });

  return savedImages
}

const filterImagesToSave = async (usrname: string, images: Image[]): Promise<Image[]> => {
  const dbImages = await getImages(usrname)

  const newImages = images.filter((image) => {
    const imageExists = dbImages.find((imageDb: any) => imageDb.tweetId === image.tweetId)
    return !imageExists && image.url.length > 0
  })

  return newImages
}

export {
  insertImages,
  getImages,
  filterImagesToSave,
  getLastImages,
}
