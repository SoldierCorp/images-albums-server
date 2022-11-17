import cron from 'node-cron'
import { saveTweeterImages } from '../getAllTweets'

const runCronjob = async () => {
  console.log('Running At 07:00.');
  const images = await saveTweeterImages()
  console.log('Total images uploaded: ', images.length);
}

const saveTweeterImagesCronjob = async () => {
  await runCronjob()
  cron.schedule('0 7 * * *', async () => {
    await runCronjob()
  }).start();
}

export { saveTweeterImagesCronjob }

