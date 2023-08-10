import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BarbersModule } from 'src/barbers/barbers.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    BarbersModule,
    JwtModule.register({
      global: false,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' }, // trocar o tempo depois
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
