import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-bill.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
