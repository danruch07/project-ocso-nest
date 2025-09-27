import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  create(createLocationDto: CreateLocationDto) {
    return this.locationsRepository.save(createLocationDto);
  }

  findAll() {
    return this.locationsRepository.find();
  }

  findOne(id: number) {
    const location = this.locationsRepository.findOneBy({
      locationId: id,
    })
    if(!location) throw new NotFoundException("Location not found")
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.locationsRepository.preload({
      locationId: id,
      ...updateLocationDto
    });
    if (!location) {
      throw new NotFoundException(`Location with id ${id} not found`);
    }
    return this.locationsRepository.save(location);
  }

  remove(id: number) {
    return this.locationsRepository.delete({
      locationId: id
    })
    }
}
