import type { Image } from '../actions/types'

import {
  getUser,
  // getTweets,
  getAllTweets,
} from '../actions/tweeter'

import { uploadMultipleImages } from '../actions/cloudinary'

import { orderDesc } from '../actions/tweeter'

import { addTagsToImages } from '../actions/imagga'

import {
  insertImages,
  filterImagesToSave,
} from '../db'

const saveTwetterImages = async (): Promise<Image[]> => {

  const username = 'ImagesAlbum'
  const user = await getUser(username)

  const tweetsImagesAll = await getAllTweets(user.id)
  console.log('Las images: ', tweetsImagesAll.length)

  console.log('---------------------------')

  const imagestoSave = await filterImagesToSave(username, tweetsImagesAll)
  console.log('images to save: ', imagestoSave.length)

  console.log('---------------------------')

  console.log('Uploading images...')
  const imageUploaded = await uploadMultipleImages(imagestoSave)
  console.log('Images uploaded: ', imageUploaded.length)

  console.log('---------------------------')

  const imagesWithTags = await addTagsToImages(imagestoSave)

  await insertImages(username, imagesWithTags)
  console.log('Images saved in db: ', imagesWithTags.length)


  const orderedImages = orderDesc(imagesWithTags)

  return orderedImages

}


export { saveTwetterImages }
