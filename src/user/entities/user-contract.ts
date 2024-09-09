import { AuditableEntity } from 'src/base/auditable.entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { User } from './user'

@Entity('user_contracts')
export class UserContract extends AuditableEntity {
  @Column()
  userId: string

  @Column()
  contractTemplateId: string

  @Column({ nullable: true })
  contractLevelId: string

  @Column()
  projectId: string

  @Column()
  type: string //ContractTemplateType

  @Column()
  userName: string

  @Column()
  userFullAddress: string

  @Column()
  userPhone: string

  @Column()
  userMail: string

  @Column({ nullable: true })
  contractLenght: string

  @Column({ nullable: true })
  contractFee: number

  @Column({ nullable: true })
  contractShares: number

  @Column()
  project: string

  @Column()
  projectPerson: string

  @Column()
  projectEmail: string

  @Column()
  projectName: string

  @Column()
  projectNumber: string

  @Column()
  projectAdress: string

  @Column()
  status: string

  @Column({ nullable: true })
  postingDay: string

  @Column({ nullable: true })
  sendDate: Date

  @Column({ nullable: true })
  sendUpdatedDate: Date

  @Column({ nullable: true })
  signedDate: Date

  @Column({ nullable: true })
  expirationDate: Date

  @ManyToOne(() => User, (user) => user.userContracts)
  user: User
}
