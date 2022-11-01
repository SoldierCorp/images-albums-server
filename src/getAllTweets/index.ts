import type { Image } from '../twetter/types'

import {
  getUser,
  getTweets,
  // getAllTweets,
} from '../twetter/actions'

import {
  uploadMultipleImages,
} from '../twetter/cloudinary'

import { orderDesc } from '../twetter/actions'

import {
  insertImages,
  filterImagesToSave,
} from '../db'


const saveTwetterImages = async (): Promise<Image[]> => {

  const username = 'ImagesAlbum'
  const user = await getUser(username)

  const tweetsImagesAll = await getTweets(user.id, 5)
  console.log('Las images: ', tweetsImagesAll.length)

  console.log('---------------------------')


  const imagestoSave = await filterImagesToSave(username, tweetsImagesAll)
  console.log('images to save: ', imagestoSave.length)

  console.log('---------------------------')

  console.log('Uploading images...')
  const imageUploaded = await uploadMultipleImages(imagestoSave)
  console.log('Images uploaded: ', imageUploaded.length)

  console.log('---------------------------')


  console.log('Saving images in db...')
  await insertImages(username, imageUploaded)
  console.log('Images saved in db: ', imageUploaded.length)


  const orderedImages = orderDesc(imageUploaded)

  return orderedImages

}


export { saveTwetterImages }

// 256 px

// spacing 70 header
