import { User } from '@/models/user';
import BaseService from './base.service';

export type SignUpRequest = {
  name: string;
  password: string;
  email: string;
};

export type SignInRequest = Omit<SignUpRequest, 'name'>;

export type SignUpResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type SignInResponse = SignUpResponse;

export type RefreshAuthResponse = SignUpResponse;

class UsersService extends BaseService {
  getUser = (id: User['id']) => {
    return this.httpRequest.get<User>(`/users/${id}`);
  };

  getAllUsers = () => {
    return this.httpRequest.get<User[]>('/users');
  };

  createUser = (data: User) => {
    return this.httpRequest.post<User>('/users', data);
  };

  updateUser = (userId: User['id'], data: User) => {
    return this.httpRequest.patch<User>(`/users/${userId}`, data);
  };

  deleteUser = (userId: string) => {
    return this.httpRequest.delete<User>(`/users/${userId}`);
  };

  signUp = (data: SignUpRequest) => {
    return this.httpRequest.post<SignUpResponse>('/auth/signup', data, false);
  };

  signIn = (data: SignInRequest) => {
    return this.httpRequest.post<SignInResponse>('/auth/signin', data, false);
  };

  signOut = () => {
    return this.httpRequest.post('/auth/signout', null, false);
  };

  refreshAuth = () => {
    return this.httpRequest.post<RefreshAuthResponse>('/auth/tokens/refresh');
  };

  getProfile = () => {
    return this.httpRequest.get<User>('/auth/profile');
  };
}

export default UsersService;
