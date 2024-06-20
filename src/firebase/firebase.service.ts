import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebase: admin.app.App,
  ) {}

  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return this.firebase.auth().verifyIdToken(idToken);
  }
}
