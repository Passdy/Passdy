import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { Department } from './department.entity';

@Entity({
  name: 'collections',
})
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => Product)
  @JoinTable({
    name: "collection_items",
    joinColumn: {
      name: "collections",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "products",
      referencedColumnName: "id"
    }
  })
  products: Product[];

  @ManyToOne(type => Department)
  @JoinColumn({ name: "department_id" })
  department: Department;
}
