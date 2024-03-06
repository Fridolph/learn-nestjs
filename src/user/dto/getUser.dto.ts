export interface getUsersDto {
  page: number
  limit?: number
  username?: string
  role?: number // 下拉框
  gender?: number // 性别点选
}