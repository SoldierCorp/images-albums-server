import type { Image } from '../actions/types'

import {
  getUser,
  getTweets,
  getAllTweets,
} from '../actions/tweeter'

import { uploadMultipleImages } from '../actions/cloudinary'

import { orderDesc } from '../actions/tweeter'

import { addTagsToImages } from '../actions/imagga'

import {
  insertImages,
  filterImagesToSave,
  getLastImages,
} from '../db'

const saveTweeterImages = async (): Promise<Image[]> => {
  const username = 'ImagesAlbum'

  const user = await getUser(username)
  console.log('user: ', user)

  console.log('---------------------------')

  const lastImagesSaved = await getLastImages(username)
  console.log('lastImagesSaved: ', lastImagesSaved.length)

  const isFirstExecution = lastImagesSaved.length === 0
  console.log('isFirstExecution: ', isFirstExecution)

  const tweetsImagesAll = isFirstExecution
    ? await getAllTweets(user.id)
    : await getTweets(user.id)
  console.log('tweetsImagesAll: ', tweetsImagesAll.length)

  console.log('---------------------------')

  const imagestoSave = await filterImagesToSave(username, tweetsImagesAll)
  console.log('images to save: ', imagestoSave.length)

  console.log('---------------------------')

  console.log('Uploading images...')
  const imageUploaded = await uploadMultipleImages(imagestoSave)
  console.log('Images uploaded: ', imageUploaded.length)

  console.log('---------------------------')

  const imagesWithTags = await addTagsToImages(imageUploaded)

  await insertImages(username, imagesWithTags)
  console.log('Images saved in db: ', imagesWithTags.length)

  const orderedImages = orderDesc(imagesWithTags)

  return orderedImages

}


export { saveTweeterImages }
