import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { BarbersService } from 'src/barbers/barbers.service';
import { Barber } from 'src/barbers/entities/barber.entity';

@Injectable()
export class AuthService {
  constructor(
    private barbersService: BarbersService,
    private jwtService: JwtService,
  ) {}

  async validarUsuario(username: string, password: string): Promise<any> {
        const barber:Barber = await this.barbersService.findOneBy(username);
        //console.log('eu',usuario);

        if(barber === null){
          throw new HttpException("Usuario não encontrado", HttpStatus.FORBIDDEN);
        }
        
        if(username == barber.login && await bcrypt.compare(password, barber.password)) {
         /* const { senha, ...result } = usuario;
          return result;*/
          //console.log('cert')
          const payload = { permissao: usuario.permissao, username: barber.login, sub: usuario.idUsuario };
          //console.log(payload)
          //console.log(usuario)
  
          return {
            access_token:  this.jwtService.sign(payload),
          };

        }else{
          throw new HttpException("Verifique a senha", HttpStatus.FORBIDDEN);
        }
        //return null;
        
      }