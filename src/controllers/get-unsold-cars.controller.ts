import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';


@Controller('/cars/unsold')
@UseGuards(AuthGuard('jwt'))
export class GetUnsoldCarsController {
    constructor(private prisma: PrismaService) {}

    @Get()
    async handle() {
        const  cars = await this.prisma.car.findMany({
            where: {
                sold: false
            },
            orderBy: {
                createdAt: 'desc'
            },
        })
        return { cars }
    }
}

