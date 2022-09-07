import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';


@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService, private authService: AuthService) { }

    @UseGuards(JwtAuthGuard)
    @Get('listar')
    async listar(): Promise<Usuario[]> {
        return this.usuarioService.listar();
    }

    @Post('cadastrar')
    async cadastrar(@Body() data): Promise<ResultadoDto> {
        return this.usuarioService.cadastrar(data)
    }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}