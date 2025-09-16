import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: 'Paquetaxxo',
      price: 47,
      countSealed: 3,
      provider: uuid()
    },
    {
      productId: uuid(),
      productName: 'Coca-cola 600ml',
      price: 23,
      countSealed: 2,
      provider: uuid()
    },
    {
      productId: uuid(),
      productName: 'Agua Ciel 600ml',
      price: 15,
      countSealed: 1,
      provider: uuid()
    }
  ];
  create(createProductDto: CreateProductDto) {
    createProductDto.productId = uuid();
    this.products.push(createProductDto);
    return createProductDto;
  }

  findAll() {
    return this.products;
    }

  findOne(id: string) {
    const productFound =this.products.filter(product => product.productId === id)[0];
    if(!productFound) throw new NotFoundException();
    return productFound;
    }

  findByProvider(id: string) {
    const productsFound = this.products.filter(product => product.provider === id);
    if(productsFound.length == 0) throw new NotFoundException();
    return productsFound;
    }

  update(id: number, updateProductDto: UpdateProductDto) {
    let product = this.findOne[id];
    product = {...product, ...updateProductDto}
    return product;
    }

  remove(id: string) {
    const {productId} = this.findOne(id);
    this.products = this.products.filter(product => product.productId !== id);
    return this.products;
    }
}
