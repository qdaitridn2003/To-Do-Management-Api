import { Module } from '@nestjs/common';
import { FirebaseService } from 'src/services';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
