import { Firebase } from '@/utils/constants';
import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

type AdminApp = admin.app.App;
@Injectable()
export class FirebaseService {
  constructor(
    @Inject(Firebase.FIREBASE_ADMIN) private readonly firebase: AdminApp,
  ) {}

  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return this.firebase.auth().verifyIdToken(idToken);
  }
}
