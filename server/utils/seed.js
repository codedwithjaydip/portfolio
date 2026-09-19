import 'dotenv/config';
import mongoose from 'mongoose';
import { readFile } from 'node:fs/promises';
import { connectDB } from '../config/db.js';
import Project from '../models/Project.js';

const seedPath = new URL('./projects.seed.json', import.meta.url);

async function run() {
  await connectDB();
  if (mongoose.connection.readyState !== 1) {
    console.error('Seeding needs a database connection. Check MONGO_URI.');
    process.exit(1);
  }

  const projects = JSON.parse(await readFile(seedPath, 'utf8'));

  for (const project of projects) {
    await Project.findOneAndUpdate({ slug: project.slug }, project, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    console.log(`Saved: ${project.title}`);
  }

  console.log(`\n${projects.length} projects seeded.`);
  await mongoose.disconnect();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
