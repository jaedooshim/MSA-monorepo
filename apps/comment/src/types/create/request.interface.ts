export interface ICommentCreate {
  content: string;
  memberId: string;
  productId: number;
  adminId?: string;
}
