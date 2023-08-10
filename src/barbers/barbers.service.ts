import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBarberDto } from './dto/create-barber.dto';
import { UpdateBarberDto } from './dto/update-barber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Barber } from './entities/barber.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BarbersService {
  constructor(
    @InjectRepository(Barber)
    private repositoryBarbers: Repository<Barber>,
  ) {}

  async create(createBarberDto: CreateBarberDto) {
    const barbers = new Barber();

    const nameExists: Barber = await this.repositoryBarbers.findOneBy({
      name: createBarberDto.name,
    });

    const surNameExists: Barber = await this.repositoryBarbers.findOneBy({
      surName: createBarberDto.surName,
    });

    const loginExists: Barber = await this.repositoryBarbers.findOneBy({
      login: createBarberDto.login,
    });

    if (nameExists && surNameExists) {
      throw new HttpException(
        'Este nome já está sendo ultilizado',
        HttpStatus.FORBIDDEN,
      );
    }

    if (loginExists) {
      throw new HttpException(
        'Esse login está sendo ultilizado',
        HttpStatus.FORBIDDEN,
      );
    }
    const saltOrRounds = 10;
    barbers.name = createBarberDto.name;
    barbers.surName = createBarberDto.surName;
    barbers.login = createBarberDto.login;
    barbers.password = await bcrypt.hash(
      createBarberDto.password.toString(),
      saltOrRounds,
    );

    return (
      this.repositoryBarbers.save(barbers),
      new HttpException('Barbeiro cadastrado com sucesso', HttpStatus.CREATED)
    );
  }

  findAll() {
    return this.repositoryBarbers.find({
      select: {
        name: true,
        surName: true,
        login: true,
      },
    });
  }

  findOneBy(username: string): Promise<Barber | undefined> {
    throw new Error('Method not implemented.');
  }

  findOne(id: number) {
    return `This action returns a #${id} barber`;
  }

  update(id: number, updateBarberDto: UpdateBarberDto) {
    return `This action updates a #${id} barber`;
  }

  remove(id: number) {
    return (
      this.repositoryBarbers.delete(id),
      new HttpException('Barbeiro deletado com sucesso', HttpStatus.FORBIDDEN)
    );
  }
}
