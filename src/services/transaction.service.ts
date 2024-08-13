import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from 'src/dto/createTransaction.dto';
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';
import { UserService } from './user.service'; // Import UserService for balance updates

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    private userService: UserService, // Inject UserService
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const { amount, type, userId } = createTransactionDto;

    // Find the user and check current balance
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (type === 'debit' && user.walletBalance < amount) {
      throw new Error('Insufficient balance');
    }

    // Create the transaction
    const newTransaction = new this.transactionModel(createTransactionDto);

    // Update the user's balance
    const newBalance = type === 'credit' ? user.walletBalance + amount : user.walletBalance - amount;
    await this.userService.updateUserBalance(userId, newBalance);

    // Save the transaction
    return newTransaction.save();
  }
}
