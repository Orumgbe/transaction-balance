import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { UsersController } from './controllers/user.controller';
import { TransactionsController } from './controllers/transaction.controller';
import { UserService } from './services/user.service';
import { TransactionService } from './services/transaction.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/streamslab'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [UsersController, TransactionsController],
  providers: [UserService, TransactionService],
})
export class AppModule {}
