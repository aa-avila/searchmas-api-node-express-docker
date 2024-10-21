import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class RequestExternalDataDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  requester: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  requestReason?: string;
}
