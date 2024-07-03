import { Firebase } from '@/utils/constants';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

export const firebaseProvider = {
  provide: Firebase.FIREBASE_ADMIN,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const firebaseAuthConfig = configService.get(
      'firebaseAuth',
    ) as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseAuthConfig),
      databaseURL: `https://${firebaseAuthConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseAuthConfig.projectId}.appspot.com`,
    });
  },
};
