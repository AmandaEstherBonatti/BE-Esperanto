import { Body, Controller, Put } from "@nestjs/common";
import { RefreshTokenDto } from "./dto/refresh.token.dto";
import { TokenService } from "./token.service";

@Controller('token')
export class TokenController {
    constructor(private tokenService: TokenService) { }

    @Put('refresh')
    async refreshToken(@Body() data: RefreshTokenDto) {
        this.tokenService.refreshToken(data.oldToken)
    }

}