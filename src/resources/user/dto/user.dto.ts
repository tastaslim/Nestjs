import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  address: string;
}

// Using this now all the properties are inherited by UpdateUserDTO but all the properties are optional
export class UpdateUserDTO extends PartialType(CreateUserDTO) {}

export class LoginUserDTO {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
