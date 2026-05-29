import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Product} from './Product';
import {User} from './User';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => User)
  public user: User;

  @ManyToOne(() => Product)
  public product: Product;

  @Column({default: 1})
  public quantity: number;

  @Column({default: 'pending'})
  public status: string;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;
}
