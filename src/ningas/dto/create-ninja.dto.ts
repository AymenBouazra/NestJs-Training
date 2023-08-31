import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(3, {
    message: 'Name  must be more than or equal to 3 caracters long',
  })
  name: string;
  @IsEnum(['stars', 'nunchucks'], { message: 'Use correct weapon!' })
  weapon: 'stars' | 'nunchucks';
}
