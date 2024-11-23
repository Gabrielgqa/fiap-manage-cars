import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/cars')
@UseGuards(AuthGuard('jwt'))
export class CreateCarController {
    constructor() {}

    @Post()
    async handle() {
        return 'ok';
    }
}

