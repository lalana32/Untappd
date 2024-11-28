export interface Notification {
  id: number;
  message: string;
  isRead: boolean;
  createdAt: string;
  interactingUserId: string;
  postId: number;
  type: NotificationType;
}

export enum NotificationType {
  Follow = 0,
  Like = 1,
  Comment = 2,
}
