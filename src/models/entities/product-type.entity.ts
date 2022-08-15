import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity'

@Entity({
  name: 'product_types',
}) 	
export class ProductType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;
}
