import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common'; // Make sure to import ParseIntPipe
import { PrismaService } from './prisma.service';
import { Post as PostEntity, Prisma } from '@prisma/client'; // Rename the imported Post to PostEntity

@Controller('post')
export class PostController {
  constructor(private readonly prisma: PrismaService) {} // Use PrismaService

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return await this.prisma.post.findMany();
  }

  @Post()
  async create(@Body() data: Prisma.PostCreateInput): Promise<PostEntity> {
    return await this.prisma.post.create({ data });
  }

  @Put(':id')
  async update(
    @Param('id') id: string, // Use string type for id
    @Body() data: Prisma.PostUpdateInput,
  ): Promise<PostEntity> {
    return await this.prisma.post.update({
      where: { id },
      data,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<PostEntity> {
    // Use string type for id
    return await this.prisma.post.delete({
      where: { id },
    });
  }
}
