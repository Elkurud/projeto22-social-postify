import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {

  constructor(private readonly repository: MediasRepository) { }

  async create(body: CreateMediaDto) {
    const existingMedia = await this.repository.findByBody(body)
    if (existingMedia) {
      throw new ConflictException('Media with this title and username already exists');
    }
    return await this.repository.create(body);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    const media = await this.repository.findOne(id);
    if (!media) {
      throw new NotFoundException('Cannot find media with this id');
    }
    return media 
  }

  async update(id: number, body: UpdateMediaDto) {
    const existingMedia = await this.repository.findByBody(body)
    if (existingMedia) {
      throw new ConflictException('Media with this title and username already exists');
    }
    return await this.repository.update(id, body);
  }

  async remove(id: number) {
    const media = await this.repository.findOne(id);
    if (!media) {
      throw new NotFoundException('Cannot find media with this id');
    }
    return await this.repository.remove(id);
  }
}
