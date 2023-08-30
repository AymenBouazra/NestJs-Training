import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  NotFoundException,
} from '@nestjs/common';
// import { ParseIntPipe } from '@nestjs/core/pipes';

import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NingasService } from './ningas.service';

@Controller('ningas')
export class NingasController {
  constructor(private readonly ninjaService: NingasService) {}
  // GET /ninjas --> []
  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
    return this.ninjaService.getNinjas(weapon);
  }
  // GET /ninjas/:id --> { ... }
  @Get(':id')
  getOneNinja(@Param('id') id: string) {
    try {
      return this.ninjaService.getOneNinja(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  // POST /ninjas --> []
  @Post()
  createNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto);
  }
  // PUT /ninjas/:id --> { ... }
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjaService.updateNinja(+id, updateNinjaDto);
  }
  // DELETE /ninjas/:id --> { ... }
  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return this.ninjaService.removeNinja(+id);
  }
}
