export interface PrescriptionType {
  prs_id: number
  createdAt: string
  updateAt: string
  prescription: string
  totalAmount: number | 0
  paidAmount: number | 0
  remainBalance: number | 0
  patinetId: number
}
