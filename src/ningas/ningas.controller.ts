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
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';

import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NingasService } from './ningas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ningas')
// @UseGuards(BeltGuard)
export class NingasController {
  constructor(private readonly ninjaService: NingasService) {}
  // GET /ninjas --> []
  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
    return this.ninjaService.getNinjas(weapon);
  }
  // GET /ninjas/:id --> { ... }
  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjaService.getOneNinja(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  // POST /ninjas --> []
  @Post()
  @UseGuards(BeltGuard)
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto);
  }
  // PUT /ninjas/:id --> { ... }
  @Put(':id')
  updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjaService.updateNinja(id, updateNinjaDto);
  }
  // DELETE /ninjas/:id --> { ... }
  @Delete(':id')
  deleteNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjaService.removeNinja(id);
  }
}
