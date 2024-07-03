import { Module } from '@nestjs/common';
import { firebaseProvider } from './firebase.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [firebaseProvider],
  exports: [firebaseProvider.provide],
})
export class FirebaseModule {}
