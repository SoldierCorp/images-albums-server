import cron from 'node-cron'
import { saveTwetterImages } from '../getAllTweets'

const runCronjob = async () => {
  console.log('running a At 07:00.');
  const images = await saveTwetterImages()
  console.log('total images uploaded: ', images.length);
}

const saveTwetterImagesCronjob = async () => {
  await runCronjob()
  cron.schedule('* * * * *', async () => {
    await runCronjob()
  }).start();
}

export { saveTwetterImagesCronjob }

