import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { IAuditableEntity } from './Interface/auiditable.interface'
import { IBaseEntity } from './Interface/base.interface'

export class AuditableEntity implements IBaseEntity<string>, IAuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: true })
  isActive: boolean

  @Column({ default: false })
  isDeleted: boolean

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date

  @UpdateDateColumn({ nullable: true })
  updatedDate: Date
}
