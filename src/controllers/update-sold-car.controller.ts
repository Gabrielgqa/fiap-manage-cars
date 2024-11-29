import { Controller, Body, UseGuards, Put, HttpCode, Param, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';


@Controller('/cars/sold/:id')
@UseGuards(AuthGuard('jwt'))
export class UpdateSoldCarController {
    constructor(private prisma: PrismaService) {}

    @Put()
    @HttpCode(204)
    async handle(@Body() body: any, @Param('id') carId: string,) {
        const { cpfBuyer } = body;
        
        const car = await this.prisma.car.findUnique({
            where: { id: carId }
        });

        if (!car) {
            throw new NotFoundException(`Car with ID ${carId} not found`);
        }

        await this.prisma.car.update({
            where: { id: carId },
            data: {
                sold: true,
                cpfBuyer: cpfBuyer,
                updatedAt: new Date(),
            },
        });

        return 'ok';
    }
}

