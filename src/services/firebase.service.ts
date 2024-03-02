import { Injectable } from '@nestjs/common';
import * as FirebaseAdmin from 'firebase-admin';

import * as FirebaseCert from '../../secrets/firebase-cert.json';

@Injectable({})
export class FirebaseService {
  private readonly firebaseStorage: FirebaseAdmin.storage.Storage;

  constructor() {
    FirebaseAdmin.initializeApp({
      credential: FirebaseAdmin.credential.cert({
        projectId: FirebaseCert.project_id,
        clientEmail: FirebaseCert.client_email,
        privateKey: FirebaseCert.private_key,
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
    this.firebaseStorage = FirebaseAdmin.storage();
  }

  getFirebaseStorageInstance(): FirebaseAdmin.storage.Storage {
    return this.firebaseStorage;
  }
}
