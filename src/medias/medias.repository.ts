import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MediasRepository {

  constructor (private readonly prisma: PrismaService) { }

  create(data: CreateMediaDto) {
    return this.prisma.media.create({ data });
  }

  findAll() {
    return this.prisma.media.findMany();
  }

  findOne(id: number) {
    return this.prisma.media.findFirst({
      where: {id}
    });
  }

  findByBody(body: CreateMediaDto) {
    return this.prisma.media.findFirst({
      where: { title: body.title, username: body.username },
    });
  }

  update(id: number, data: UpdateMediaDto) {
    const updatedMedia = this.prisma.media.update({
      where: { id },
      data,
    });
    return updatedMedia;
  }

  remove(id: number) {
    const deletedMedia = this.prisma.media.delete({
      where: { id },
    });
    return deletedMedia;
  }
}
