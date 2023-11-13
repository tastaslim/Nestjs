import { Controller, Get } from '@nestjs/common';

@Controller('group')
export class GroupController {
  @Get()
  async listGroups() {
    return 'Ok';
  }
}
