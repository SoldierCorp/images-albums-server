import axios from 'axios'
import dotenv from 'dotenv'
import type {
  User,
  RecursionTweets,
  BaseTweet,
  Image,
} from './types'

dotenv.config()

const orderDesc = (images: Image[]): Image[] => {
  return images.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })
}

const unifyTweet = (data: BaseTweet[], media: any[]): Image[] => {
  const tweetsWithMedia = data.filter((tweet: BaseTweet) => tweet.attachments)

  let tweets: Image[] = []
  tweetsWithMedia.forEach((tweet: BaseTweet) => {
    const mediaKeys = tweet.attachments?.media_keys ?? []
    const mediaFiltered = media.filter((media) => mediaKeys.includes(media.media_key))

    mediaFiltered.forEach((media) => {
      tweets = [
        ...tweets,
        {
          url: media.url ?? '',
          width: media.width,
          height: media.height,
          tweetId: `${tweet.id}/${media.media_key}`,
          created_at: tweet.created_at,
        }
      ]
    })
  })

  return tweets
}

const getUser = async (username: string): Promise<User> => {
  const userUrl = `https://api.twitter.com/2/users/by/username/${username}`

  const user = await axios.get(userUrl, {
    headers: {
      'Authorization': `Bearer ${process.env.TWEETER_TOKEN}`
    }
  })

  return user.data.data
}

const getTweets = async (userId: string, maxResults = 20): Promise<Image[]> => {
  const urlTweets = `https://api.twitter.com/2/users/${userId}/tweets?tweet.fields=attachments,created_at&expansions=attachments.media_keys&media.fields=height,width,url&max_results=${maxResults}`

  const tweets = await axios.get(urlTweets, {
    headers: {
      'Authorization': `Bearer ${process.env.TWEETER_TOKEN}`
    }
  })

  return unifyTweet(tweets.data.data, tweets.data.includes.media)
}

const getRecursionTweets = async (userId: string, nextTokenToFetch = ''): Promise<RecursionTweets> => {
  const pagination_token = nextTokenToFetch ? `&pagination_token=${nextTokenToFetch}` : ''
  const urlTweets = `https://api.twitter.com/2/users/${userId}/tweets?tweet.fields=attachments,created_at&expansions=attachments.media_keys&media.fields=height,width,url&max_results=100${pagination_token}`

  const tweets = await axios.get(urlTweets, {
    headers: {
      'Authorization': `Bearer ${process.env.TWEETER_TOKEN}`
    }
  })

  if (tweets.data.meta.result_count === 0) {
    return {
      tweets: [],
      isPagination: false,
      nexToken: ''
    }
  }

  return {
    tweets: unifyTweet(tweets.data.data, tweets.data.includes.media),
    isPagination: tweets.data.meta.next_token ? true : false,
    nexToken: tweets.data.meta.next_token,
  }
}

const getAllTweets = async (userId: string, tweetsList: any[] = [], stop = false, nextTokenToFetch: string = ''): Promise<any[]> => {
  if (stop) return tweetsList

  const {
    tweets,
    isPagination,
    nexToken,
  } = await getRecursionTweets(userId, nextTokenToFetch)
  return await getAllTweets(userId, [...tweetsList, ...tweets], !isPagination, nexToken)
}

export {
  getUser,
  getAllTweets,
  getTweets,
  orderDesc,
}
