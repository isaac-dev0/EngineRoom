import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  authorId: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 1024)
  content: string;
}
