import { IsString, IsNotEmpty, IsNumber, IsEnum, IsMongoId, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsEnum(['debit', 'credit'])
  @IsNotEmpty()
  type: 'debit' | 'credit';

  @IsString()
  status?: 'pending' | 'completed' | 'failed';

  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
