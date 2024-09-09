import { AuditableEntity } from 'src/base/auditable.entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { User } from './user'

@Entity('user_addresses')
export class UserAddress extends AuditableEntity {
  @Column()
  userId: string

  @Column()
  country: string

  @Column()
  countryCode: string

  @Column()
  postCode: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  detail: string

  @Column({ default: true })
  isMain: boolean

  @ManyToOne(() => User, (user) => user.userAddress)
  user: User
}
