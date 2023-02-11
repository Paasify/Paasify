import { Queue } from 'bullmq';

const appCreationQueue = new Queue('create-app', {
    connection: {
        host: process.env.REDIS_URL
    }
})

const createNewApp = (data) => {
    appCreationQueue.add(data);
}