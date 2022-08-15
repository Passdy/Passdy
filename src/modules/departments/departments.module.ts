import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/models/entities/department.entity';
import { DepartmentRepository } from 'src/models/repositories/departments.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Department,
      DepartmentRepository,
    ]),
  ],
  controllers: [DepartmentsController],
  providers: [DepartmentsService]
})
export class DepartmentsModule {}
