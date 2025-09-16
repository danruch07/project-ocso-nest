import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product)
    private productRepository: Repository <Product>) {}
  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: 'Paquetaxxo',
      price: 47,
      countSeal: 3,
      provider: uuid()
    },
    {
      productId: uuid(),
      productName: 'Coca-cola 600ml',
      price: 23,
      countSeal: 2,
      provider: uuid()
    },
    {
      productId: uuid(),
      productName: 'Agua Ciel 600ml',
      price: 15,
      countSeal: 1,
      provider: uuid()
    }
  ];
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
    const productsFound = this.products.filter(product => product.provider === id);
    if(productsFound.length == 0) throw new NotFoundException();
    return productsFound;
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
    this.findOne(id);
    this.productRepository.delete(id);
    return {
      message: `Objeto con id ${id} eliminado`
    }
    }
}
