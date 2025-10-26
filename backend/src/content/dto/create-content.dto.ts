import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateContentDto {
  @IsString()
  title!: string;

  @IsString()
  body!: string;

  @IsUUID()
  authorId!: string;

  @IsOptional()
  @IsDateString()
  publishedAt?: string;
}
