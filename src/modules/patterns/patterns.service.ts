import { Injectable } from '@nestjs/common';
import { CreatePatternDto } from './dto/create-pattern.dto';
import { UpdatePatternDto } from './dto/update-pattern.dto';
import { PatternRepository } from 'src/models/repositories/patterns.repository';

@Injectable()
export class PatternsService {
  constructor(private readonly patternRepository: PatternRepository) {}

  create(createPatternDto: CreatePatternDto) {
    return this.patternRepository.save(createPatternDto);
  }

  findAll() {
    return this.patternRepository.find();
  }

  findOne(id: number) {
    return this.patternRepository.findOne(id)
  }

  update(id: number, updatePatternDto: UpdatePatternDto) {
    return this.patternRepository.update(id, updatePatternDto);
  }

  remove(id: number) {
    return this.patternRepository.delete(id);
  }
}
