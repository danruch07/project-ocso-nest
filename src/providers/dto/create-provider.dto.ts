import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";
import {Provider} from "../entities/provider.entity";

export class CreateProviderDto {
    @IsString()
    @MaxLength(100)
    providerName: string;
    @IsEmail()
    @MaxLength(100)
    providerEmail: string;
    @IsString()
    @MaxLength(15)
    @IsOptional()
    providerPhoneNumber: string;
}
