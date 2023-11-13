import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  name: string;
  @Column()
  age: number;
  @Column()
  description: string;
  @Column()
  address: string;
}
