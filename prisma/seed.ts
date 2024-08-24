import { connect, connection } from 'mongoose';
import { WebAnalyticsSchema } from '../src/web-analytics/schemas/web-analytics.schema';
import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

async function seed() {
  await connect(process.env.ORMONGO_URL as string);

  const WebAnalyticsModel = connection.model(
    'web-analytics',
    WebAnalyticsSchema,
  );

  const webAnalyticsData = [];
  const baseURLs = [
    'https://example.com',
    'https://example.org',
    'https://example.net',
  ];
  const currentYear = new Date().getFullYear();

  for (let i = 0; i < 20; i++) {
    const randomYear = currentYear - Math.floor(Math.random() * 3) - 1;
    const randomDate = new Date(
      randomYear,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    );
    const randomURL = baseURLs[Math.floor(Math.random() * baseURLs.length)];

    webAnalyticsData.push({
      _id: new mongoose.Types.ObjectId(),
      pageURL: randomURL,
      visitDate: randomDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await WebAnalyticsModel.insertMany(webAnalyticsData);
  console.log('Seed data inserted');
  process.exit();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
