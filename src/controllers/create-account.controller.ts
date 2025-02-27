
import { ConflictException, UsePipes } from '@nestjs/common';
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';

const createAccountBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

type CreateAccountBody = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
    constructor(private prisma: PrismaService) {}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async handle(@Body() body: CreateAccountBody) {
        const { name, email, password } = createAccountBodySchema.parse(body);

        const userWithSameEmail = await this.prisma.user.findUnique({
            where: {
                email,
            }
        })

        if (userWithSameEmail) {
            throw new ConflictException('Another user with same e-mail already exists.');
        }

        const hashedPassword = await hash(password, 8);

        await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })
    }
}

