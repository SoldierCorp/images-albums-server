
// Twitter
export interface User {
  id: string;
  name: string;
  username: string;
}

export interface RecursionTweets {
  tweets: Image[];
  isPagination: boolean;
  nexToken: string;
}

export type BaseTweet = {
  edit_history_tweet_ids: string[],
  text: string,
  attachments?: { media_keys: string[] },
  id: string,
  created_at: string;
}

export type Media = {
  height: number;
  width: number;
  url: string;
}


type MediaKeyTweetId = string
export interface Image extends Media {
  tweetId: MediaKeyTweetId;
  created_at: string;
}


// Cloudinary
export type CloudinaryImage = {
  asset_id: string,
  width: number,
  height: number,
  format: string,
  resource_type: string,
  created_at: string,
  type: string,
  url: string,
  folder: string,
  original_filename: string,
}

export type UploadImage = {
  error: boolean,
  message: string,
  image: Image
}


// DB
export type DBResponse = {
  error: boolean,
  message: string,
  images: Image[],
}
