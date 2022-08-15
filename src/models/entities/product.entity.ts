import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { ProductType } from './product-type.entity';
import { Size } from './size.entity';
import { Color } from './color.entity';
import { Pattern } from './pattern.entity';
import { Material } from './material.entity';
import { Brand } from './brand.entity';
import { Collection } from './collection.entity';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_id: number;

  @Column()
  sku: string;

  @Column()
  price: number;
  
  @Column()
  sort_status: string;

  @Column()
  product_status: string;

  @Column()
  sell_status: string;

  @ManyToOne(type => ProductType)
  @JoinColumn({ name: "product_type_id" })
  product_type: ProductType;

  @ManyToOne(type => Size)
  @JoinColumn({ name: "size_id" })
  size: Size;

  @ManyToOne(type => Color)
  @JoinColumn({ name: "color_id" })
  color: Color;

  @Column()
  description: string

  @Column()
  measure: string

  @ManyToOne(type => Pattern)
  @JoinColumn({ name: "pattern_id" })
  pattern: Pattern;

  @ManyToOne(type => Material)
  @JoinColumn({ name: "material_id" })
  material: Material;

  @ManyToOne(type => Brand)
  @JoinColumn({ name: "branch_id" })
  branch: Brand;

  @Column()
  discount_percent: number

  @ManyToMany(type => Collection)
  @JoinTable({
    name: "collection_items",
    joinColumn: {
      name: "products",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "collections",
      referencedColumnName: "id"
    }
  })
  collections: Collection[];
}
