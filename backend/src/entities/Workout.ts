import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { WorkoutExercise } from "./WorkoutExercise";

@ObjectType()
@Entity()
export class Workout extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column('boolean', {default : false})
  pub: boolean = false;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.workouts)
  creator: User;

  @Field(() => WorkoutExercise)
  @OneToMany(() => WorkoutExercise, (workoutExercise) => workoutExercise.workout)
  workoutExercise: WorkoutExercise[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
