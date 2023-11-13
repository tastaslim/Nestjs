import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateChatDTO {
  @ApiProperty()
  id: number;

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
export class UpdateUserDTO extends PartialType(CreateChatDTO) {}
