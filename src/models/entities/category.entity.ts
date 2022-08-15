import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { Department } from './department.entity';
import { ProductType } from './product-type.entity'

@Entity({
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Department)
  @JoinColumn({ name: "department_id" })
  department: Department;

  @OneToMany(() => ProductType, (product_type) => product_type.category)
  @JoinColumn({ name: "department_id" })
  product_types: ProductType[];
}
