import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async getAllPayments() {
    return this.paymentService.getAllPayments();
  }

  @Get(':id')
  async getPaymentById(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.getPaymentById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @Put(':id')
  async updatePayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentService.updatePayment(id, updatePaymentDto);
  }

  @Delete(':id')
  async deletePayment(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.deletePayment(id);
  }
}
