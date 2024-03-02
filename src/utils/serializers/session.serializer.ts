/* eslint-disable @typescript-eslint/ban-types */
import { PassportSerializer } from '@nestjs/passport';

export class SessionSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  serializeUser(token: string, done: Function) {
    console.log('Serialize:', token);
    return done(null, token);
  }
  deserializeUser(token: string, done: Function) {
    console.log('Deserialize:', token);
    return done(null, token);
  }
}
