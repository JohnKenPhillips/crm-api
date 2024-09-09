export interface IAuditableEntity {
  isActive: boolean
  isDeleted: boolean
  createdDate: Date
  updatedDate?: Date
}
