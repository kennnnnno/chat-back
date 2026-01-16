import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  readonly id: number;
  @Column('varchar')
  name: string;
  @Column('int')
  member: string;
  @CreateDateColumn()
  readonly created_at?: Date;
}
