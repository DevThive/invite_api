import { Category } from 'src/templates/types/template.type';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { User } from './user.entity';

// import { noticeRole } from 'src/notice/types/Notice.type';

@Entity({
  name: 'templates', // 데이터베이스 테이블의 이름
})
export class Template {
  //아이디
  @PrimaryGeneratedColumn()
  id: number;

  // 제목
  @Column()
  name: string;

  // 템플릿 설명
  @Column()
  content: string;

  // 카테고리
  @Column({ type: 'enum', enum: Category, default: Category.main })
  category: Category;

  // 템플릿 상단 서브 제목
  @Column()
  contact_subname: string;

  // 템플릿 상던 메인 제목
  @Column()
  contact_mainname: string;

  // 템플릿 카카오 아이디
  @Column()
  contact_kakaoid: string;

  // 템플릿 번호
  @Column()
  contact_phone: string;

  // 템플릿 시간
  @Column()
  contact_time: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  //   @ManyToOne(() => User, (user) => user.contacts, {})
  //   user: Relation<User>;
}
