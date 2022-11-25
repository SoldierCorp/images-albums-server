import cron from 'node-cron'
import { saveTweeterImages } from '../getAllTweets'

const runCronjob = async () => {
  console.log('Running At 07:00.');
  const images = await saveTweeterImages()
  return images
}

const runCronjobExecutionTime = async () => {
  const start = Date.now();
  const images = await runCronjob()
  const imagesUploaded = images.map(image => image.tweetId)
  console.log('---------------------------')
  console.log('Total images uploaded: ', images.length);
  console.log("Id's images uploaded: ", imagesUploaded);

  const end = Date.now();
  const executionTime = `Execution time: [${end - start} ms]`
  console.log(executionTime)
}

const saveTweeterImagesCronjob = async () => {
  const startExecution = new Date().toLocaleString()
  console.log(`[${startExecution}]`)
  await runCronjobExecutionTime()
  cron.schedule('0 7 * * *', async () => {
    console.log(`[${startExecution}]`)
    await runCronjobExecutionTime()
  }).start();
}

export { saveTweeterImagesCronjob }

