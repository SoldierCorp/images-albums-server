import type { Image } from '../twetter/types'

import {
  getUser,
  // getTweets,
  getAllTweets,
} from '../twetter/actions'

import { uploadMultipleImages } from '../twetter/cloudinary'

import { orderDesc } from '../twetter/actions'

import { addTagsToImages } from '../twetter/imagga'

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

// 256 px

// spacing 70 header
