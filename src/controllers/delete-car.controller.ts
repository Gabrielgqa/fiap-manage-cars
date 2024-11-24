import { Controller, UseGuards, Delete, HttpCode, Param, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/cars/:id')
@UseGuards(AuthGuard('jwt'))
export class DeleteCarController {
    constructor(private prisma: PrismaService) {}

    @Delete()
    async handle(@Param('id') carId: string) {
        const car = await this.prisma.car.findUnique({
            where: { id: carId }
        });

        if (!car) {
            throw new NotFoundException(`Car with ID ${carId} not found`);
        }

        await this.prisma.car.delete({
            where: { id: carId },
        });

        return 'ok';
    }
}
