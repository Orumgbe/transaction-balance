import { Body, Controller, Post, UsePipes, ValidationPipe, HttpException, HttpStatus } from "@nestjs/common";
import { CreateTransactionDto } from "src/dto/createTransaction.dto";
import { TransactionService } from "src/services/transaction.service";
import { UserService } from "src/services/user.service";
import { Transaction } from "src/schemas/transaction.schema";
import { User } from "src/schemas/user.schema";


@Controller('transactions')
export class TransactionsController{
  constructor(
    private transactionService: TransactionService,
    private userService: UserService
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async handleTransaction(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const user: User = await this.userService.getUserById(createTransactionDto.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    let transactionStatus: 'completed' | 'failed' = 'completed';

    if (createTransactionDto.type === 'debit') {
      // Handle debit transaction
      if (user.walletBalance < createTransactionDto.amount) {
        transactionStatus = 'failed';
      } else {
        user.walletBalance -= createTransactionDto.amount;
      }
    } else if (createTransactionDto.type === 'credit') {
      // Handle credit transaction
      user.walletBalance += createTransactionDto.amount;
    } else {
      throw new HttpException('Invalid transaction type', HttpStatus.BAD_REQUEST);
    }

    // Update user balance if transaction is completed
    if (transactionStatus === 'completed') {
      await this.userService.updateUserBalance(user.id, user.walletBalance);
    }

    // Save the transaction with the status
    const transaction = await this.transactionService.createTransaction({
      ...createTransactionDto,
      status: transactionStatus
    });

    return transaction;
  }
}
