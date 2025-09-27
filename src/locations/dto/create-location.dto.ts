import { ArrayNotEmpty, IsArray, IsString, Max, MaxLength } from "class-validator"
import { Location } from "../entities/location.entity"


export class CreateLocationDto extends Location{
    @IsString()
    @MaxLength(35)
    declare locationName: string
    @IsString()
    @MaxLength(160)
    declare locationAddress: string
    @ArrayNotEmpty()
    declare locationLatLng: number[]
}
