import { hash } from 'argon2';

import AppDataSource from '../data-source';
import { Content } from '../../content/entities/content.entity';
import { User } from '../entities/user.entity';

async function seed() {
  await AppDataSource.initialize();

  try {
    const userRepository = AppDataSource.getRepository(User);
    const contentRepository = AppDataSource.getRepository(Content);

    let admin = await userRepository.findOne({ where: { email: 'admin@innoveo.local' } });

    if (!admin) {
      admin = userRepository.create({
        email: 'admin@innoveo.local',
        displayName: 'Demo Administrator',
        password: await hash('ChangeMe123!'),
        roles: ['admin', 'editor']
      });

      admin = await userRepository.save(admin);
      console.log('Created demo administrator: admin@innoveo.local / ChangeMe123!');
    } else {
      console.log('Demo administrator already present, skipping user creation.');
    }

    const existingContents = await contentRepository.count();

    if (existingContents === 0) {
      const demoContent = contentRepository.create([
        {
          title: 'Smart Security Overview',
          body: 'Découvrez les offres Smart Security INNOVEO et les cas d\'usages phares.',
          author: admin,
          publishedAt: new Date()
        },
        {
          title: 'Nouveaux parcours immersifs',
          body: 'Préparez-vous à explorer la sandbox immersive et l\'expérience guidée.',
          author: admin
        }
      ]);

      await contentRepository.save(demoContent);
      console.log('Seeded demo content entries.');
    } else {
      console.log(`Database already contains ${existingContents} content entries, skipping seeding.`);
    }
  } finally {
    await AppDataSource.destroy();
  }
}

seed()
  .then(() => {
    console.log('Database seeding completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database seeding failed:', error);
    process.exit(1);
  });
