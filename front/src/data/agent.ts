import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:5224/api/';

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string, token?: string) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.get(url, { headers }).then(responseBody);
  },
  post: (url: string, body: {}, token?: string) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.post(url, body, { headers }).then(responseBody);
  },
  put: (url: string, body: {}, token?: string) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.put(url, body, { headers }).then(responseBody);
  },
  delete: (url: string, token?: string) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.delete(url, { headers }).then(responseBody);
  },
};

// Beers API
const Beers = {
  getAllBeers: (token?: string) => request.get('Beers', token),
  getBeerById: (id: number, token?: string) =>
    request.get(`Beers/${id}`, token),
  addBeer: (beer: any, token?: string) => request.post('Beers', beer, token),
  updateBeer: (beer: any, token?: string) =>
    request.put(`Beers/${beer.id}`, beer, token),
  deleteBeer: (id: number, token?: string) =>
    request.delete(`Beers/${id}`, token),
};

// Auth API
const Auth = {
  login: (values: any, token?: string) =>
    request.post('Auth/login', values, token),
  register: (values: any, token?: string) =>
    request.post('Auth/register', values, token),
  getUsers: (token?: string) => request.get('Auth/getUsers', token),
  getUserById: (id: string, token?: string) =>
    request.get(`Auth/getUserById/${id}`, token),
};

// CheckIns API
const CheckIns = {
  getAllCheckIns: (token?: string) => request.get('CheckIn', token),
  getCheckInById: (id: number, token?: string) =>
    request.get(`CheckIn/${id}`, token),
  getCheckInsByUserId: (userId: string, token?: string) =>
    request.get(`CheckIn/user/${userId}`, token),
  getCheckInFeed: (userId: string, token?: string) =>
    request.get(`CheckIn/feed/${userId}`, token),
  createCheckIn: (checkIn: any, token?: string) =>
    request.post(`CheckIn/createCheckIn`, checkIn, token),
  updateCheckIn: (checkIn: any, token?: string) =>
    request.put(`CheckIn/${checkIn.id}`, checkIn, token),
  deleteCheckIn: (id: number, token?: string) =>
    request.delete(`CheckIn/${id}`, token),
};

// Follower API
const Follower = {
  getFollowers: (userId: string, token?: string) =>
    request.get(`Follower/followers/${userId}`, token),
  getFollowedUsers: (userId: string, token?: string) =>
    request.get(`Follower/followedUsers/${userId}`, token),
  followUser: (currentUserId: string, userToFollowId: string, token?: string) =>
    request.post(
      `Follower/follow?currentUserId=${currentUserId}&userToFollowId=${userToFollowId}`,
      {},
      token,
    ),
  unfollowUser: (
    currentUserId: string,
    userToUnfollowId: string,
    token?: string,
  ) =>
    request.delete(
      `Follower/unfollow?currentUserId=${currentUserId}&userToUnfollowId=${userToUnfollowId}`,
      token,
    ),
  removeFollower: (
    currentUserId: string,
    userToRemoveId: string,
    token?: string,
  ) =>
    request.delete(
      `Follower/removeFollower?currentUserId=${currentUserId}&userToRemoveId=${userToRemoveId}`,
      token,
    ),
};

// Notifications API
const Notifications = {
  getUserNotifications: (userId: string, token?: string) =>
    request.get(`Notification/${userId}`, token),
  createNotification: (values: any, token?: string) =>
    request.post(`Notification`, values, token),
  isRead: (userId: string, token?: string) =>
    request.put(`Notification/${userId}`, userId, token),
};

// Likes API
const Likes = {
  getLikesByCheckInId: (checkInId: number, token?: string) =>
    request.get(`Like/${checkInId}/getLikes`, token),
  toggleLike: (checkinId: number, userId: string, token?: string) =>
    request.post(`Like/toggle-like`, { checkinId, userId }, token), // Koristi query param
  unlike: (checkInId: number, userId: string, token?: string) =>
    request.post(`Like/${checkInId}/unlike?userId=${userId}`, {}, token), // Koristi query param
  isLiked: (checkInId: number, userId: string, token?: string) =>
    request.get(`Like/${checkInId}/isLiked?userId=${userId}`, token), // Koristi query param
};

const Comments = {
  getCommentByCheckInId: (checkInId: number, token?: string) =>
    request.get(`Comment/${checkInId}`, token),
  addComment: (
    checkInId: number,
    text: string,
    userId: string,
    token?: string,
  ) => request.post(`Comment/addComment`, { checkInId, text, userId }, token),
  deleteComment: (commentId: number, userId: string, token?: string) =>
    request.delete(
      `Comment/deleteComment?commentId=${commentId}&userId=${userId}`,
      token,
    ),
};

const agent = {
  Beers,
  Auth,
  CheckIns,
  Follower,
  Notifications,
  Likes,
  Comments,
};

export default agent;
