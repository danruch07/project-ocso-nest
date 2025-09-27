import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { not } from 'rxjs/internal/util/not';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providersRepository: Repository<Provider>
  ) {}
  create(createProviderDto: CreateProviderDto) {
    return this.providersRepository.save(createProviderDto);
    }

  findAll() {
    return this.providersRepository.find();
  }

  findOne(id: string) {
    return this.providersRepository.findOneBy({providerId: id});
  }

  findOneByName(name: string) {
    const provider = this.providersRepository.findOneBy({
      providerName: Like(`%${name}%`)
    })
    if(!provider) throw new NotFoundException();
    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const product = await this.providersRepository.preload({
      providerId: id,
      ...updateProviderDto
    });
    if (!product) {
      throw new Error(`Provider with id ${id} not found`);
    }
    return this.providersRepository.save(product);
  }

  remove(id: string) {
    this.providersRepository.delete({
      providerId:id
    })
  }
}
