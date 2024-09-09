import { AuditableEntity } from 'src/base/auditable.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { UserContract } from './user-contract'
import { UserAddress } from './user-address'

@Entity('users')
export class User extends AuditableEntity {
  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column({ nullable: true })
  password: string

  @Column()
  mainPhoneNumber: string

  @Column()
  mainSocialMediaName: string

  @Column()
  mainSocialMediaType: string

  @Column({ nullable: true })
  registrationFlowStatus: string

  @Column({ nullable: true })
  ownerId: string

  @Column({ nullable: true })
  openerId: string

  @Column({ nullable: true })
  closerId: string

  @Column()
  companyId: string

  @Column()
  userType: string

  @Column({ nullable: true })
  userLevel: number

  @Column()
  followerNumber: number

  @Column({ nullable: true })
  engagementRate: number

  @Column({ default: 'en' })
  languageCode: string

  @Column()
  contractStatus: string

  @Column()
  referralCode: string

  @Column({ nullable: true })
  referenceId: string

  @Column({ default: false })
  isVerified: boolean

  @Column({ default: false })
  isSpecial: boolean

  @Column({ nullable: true })
  passwordUpdatedDate: Date

  @Column({ nullable: true })
  profilePicture: string

  @OneToMany(() => UserContract, (userContracts) => userContracts.user)
  userContracts: UserContract[]

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  userAddress: UserAddress[]
}
