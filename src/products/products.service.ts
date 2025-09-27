import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product)
    private productRepository: Repository <Product>) {}

   create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto);
    return product;
  }

  findAll() {
    return this.productRepository.find();
    }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({productId: id});
    if(!product) throw new NotFoundException();
    return product;
    }

  findByProvider(id: string) {
    return this.productRepository.findBy({   
      provider: {providerId: id}
    }) ;
    }
    

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto
    });
    if(!productToUpdate) throw new NotFoundException();
    this.productRepository.save(productToUpdate);
    return productToUpdate; 
    }

  async remove(id: string) {
    const product = await this.findOne(id);
    if (!product ) {
      throw new NotFoundException(`No se encontró el objeto con id ${id}`);
    }
    await this.productRepository.delete(id);
    return {
      message: `Objeto con id ${id} eliminado`
    };
  }
}
