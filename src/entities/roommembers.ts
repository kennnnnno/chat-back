import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RoomMember {
  @PrimaryGeneratedColumn()
  readonly id: number;
  @Column('int')
  room_id: string;
  @Column('int')
  user_id: string;
  @CreateDateColumn()
  readonly join_at?: Date;
}
