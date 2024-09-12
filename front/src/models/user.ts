export interface User {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  id: string;
  token: string;
  roles?: string[];
  profilePictureUrl: string;
}
