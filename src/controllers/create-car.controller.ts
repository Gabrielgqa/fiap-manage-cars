import { Controller, Post, Body, HttpCode, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { UserPayload } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/cars')
@UseGuards(AuthGuard('jwt'))
export class CreateCarController {
    constructor() {}

    @Post()
    async handle(@CurrentUser() user: UserPayload) {
        console.log(user);

        return 'ok';
    }
}

