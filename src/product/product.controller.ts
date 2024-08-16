import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.getAllProducts();
  }

  @Get(':type')
  async getProductByType(@Param('type') type: string) {
    let min = 0;
    let max = 0;

    switch (type) {
      case 'alu1':
        min = 1;
        max = 8;
        break;
      case 'alu2':
        min = 9;
        max = 28;
        break;
      case 'alu3':
        min = 29;
        max = 48;
        break;
      case 'alu4':
        min = 49;
        max = 56;
        break;
      case 'alu5':
        min = 57;
        max = 73;
        break;
      case 'inox1':
        min = 74;
        max = 82;
        break;
      case 'inox2':
        min = 83;
        max = 91;
        break;
      case 'inox3':
        min = 92;
        max = 109;
        break;
      case 'inox4':
        min = 110;
        max = 124;
        break;
      case 'inox5':
        min = 125;
        max = 134;
        break;
      case 'galva1':
        min = 135;
        max = 138;
        break;
      case 'galva2':
        min = 139;
        max = 149;
        break;
      case 'galva3':
        min = 150;
        max = 160;
        break;
      case 'galva4':
        min = 161;
        max = 169;
        break;
      case 'galva5':
        min = 170;
        max = 172;
        break;
      default:
        return [];
    }

    return this.productService.getProductsByRange(min, max);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(id);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Post('many')
  createMany(@Body() createProductDto: CreateProductDto[]) {
    return this.productService.createManyProducts(createProductDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.softDelete(id);
  }
}
