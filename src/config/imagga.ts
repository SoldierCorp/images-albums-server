const got = require('got')
require('dotenv').config()

const apiKey = process.env.IMAGGA_API_KEY
const apiSecret = process.env.IMAGGA_API_SECRET

export const getTags = async (imageUrl: string): Promise<string[]> => {
  const url = 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(imageUrl);

  try {
    const response = await got(url, { username: apiKey, password: apiSecret });
    const tags = JSON.parse(response.body).result.tags.map((tag: any) => tag.tag.en)
    return tags
  } catch (error: any) {
    console.log(error);
    return []
  }
}
