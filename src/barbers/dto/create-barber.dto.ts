import { IsNotEmpty } from 'class-validator';

export class CreateBarberDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surName: string;

  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
