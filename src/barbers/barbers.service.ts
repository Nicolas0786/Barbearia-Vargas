import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBarberDto } from './dto/create-barber.dto';
import { UpdateBarberDto } from './dto/update-barber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Barber } from './entities/barber.entity';
import { Repository } from 'typeorm';

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

    return 'This action adds a new barber';
  }

  findAll() {
    return `This action returns all barbers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} barber`;
  }

  update(id: number, updateBarberDto: UpdateBarberDto) {
    return `This action updates a #${id} barber`;
  }

  remove(id: number) {
    return `This action removes a #${id} barber`;
  }
}
