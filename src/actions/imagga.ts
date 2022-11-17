import type { Image, ImageWithTags } from './types'

import { getTags } from '../config/imagga'

const addTagsToImages = async (images: Image[]): Promise<ImageWithTags[]> => {
  let elements: ImageWithTags[] = []
  for (const img of images) {

    const tags = await getTags(img.url)
    const tagsFormatted = tags.map((tag: string) => tag.toLowerCase().replace(' ', '-'))
    const el: ImageWithTags = {
      ...img,
      tags: tagsFormatted.slice(0, 10)
    }
    elements = [...elements, el]
  }

  return elements
}

export {
  addTagsToImages
}
