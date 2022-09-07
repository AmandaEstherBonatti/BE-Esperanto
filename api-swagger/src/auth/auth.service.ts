import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {

    constructor(private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private tokenService: TokenService) { }

    async validarUsuario(email: string, senha: string): Promise<any> {
        const usuario = await this.usuarioService.encontrarUm(email);
        if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
            const { senha, ...result } = usuario;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id };
        const token = this.jwtService.sign(payload)

        this.tokenService.save(token, user.email)
        return {
            access_token: token
        };
    }
}
