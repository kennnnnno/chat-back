import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;
  @Column('varchar')
  readonly user_id: string;
  @Column('varchar')
  name: string;
  @Column('varchar')
  hash: string;
  @Column('varchar')
  greet: string;
  @CreateDateColumn()
  readonly created_at?: Date;
  @UpdateDateColumn()
  readonly updated_at?: Date;
}
