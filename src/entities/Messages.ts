import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  readonly id: number;
  @Column('varchar')
  message: string;
  @Column('int')
  room_id: string;
  @Column('int')
  user_id: string;
  @CreateDateColumn()
  readonly sent_at?: Date;
}
