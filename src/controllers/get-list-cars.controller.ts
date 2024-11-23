import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';


@Controller('/cars')
@UseGuards(AuthGuard('jwt'))
export class GetListCarsController {
    constructor(private prisma: PrismaService) {}

    @Get()
    async handle() {
        const  cars = await this.prisma.car.findMany({
            orderBy: {
                createdAt: 'desc'
            },
        })

        return { cars }
    }
}

