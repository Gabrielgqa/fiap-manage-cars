import { Controller, Post, Body, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

const createCarBodySchema = z.object({
    mark: z.string(),
    model: z.string(),
    year: z.number(),
    color: z.string(),
    price: z.number(),
})

type CreateCarBody = z.infer<typeof createCarBodySchema>


@Controller('/cars')
@UseGuards(AuthGuard('jwt'))
export class CreateCarController {
    constructor(private prisma: PrismaService) {}

    @Post()
    @UsePipes(new ZodValidationPipe(createCarBodySchema))
    async handle(@Body() body: CreateCarBody) {
        
            const { mark, model, year, color, price } = createCarBodySchema.parse(body);
            
            
            await this.prisma.car.create({
                data: {
                    mark,
                    model,
                    year,
                    color,
                    price
                }
            })

            return 'ok';
    }
}

