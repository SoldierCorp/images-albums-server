import { cloudinary } from '../config/cloudinary'
import type {
  Image,
  UploadImage,
} from './types'

const uploadMultipleImages = async (images: Image[]) => {
  let gallery: Image[] = []
  for (const image of images) {
    const res = await uploadImage(image)
    if (!res.error) {
      gallery = [...gallery, res.image]
    }
  }

  return gallery
}

const uploadImage = async (image: Image): Promise<UploadImage> => {
  if (image.url.length === 0) {
    return {
      error: true,
      message: 'Image has not url',
      image: image,
    }
  }

  try {
    const resCloudinary = await cloudinary.uploader.upload(
      image.url,
      {
        folder: 'album-covers',
      }
    )
    const imageUploaded: Image = {
      ...image,
      url: resCloudinary.secure_url,
      width: resCloudinary.width,
      height: resCloudinary.height,
    }

    return {
      error: false,
      message: 'Image uploaded',
      image: imageUploaded,
    }
  } catch (error) {
    return {
      error: true,
      message: `image ${image.tweetId} filed to upload`,
      image: {} as Image,
    }
  }
}

export {
  uploadMultipleImages,
  uploadImage,
}
