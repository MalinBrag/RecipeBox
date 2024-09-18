import { User } from './user.model';

/**
 * Interface representing the response recieved after a successful login
 */

export interface LoginResponse {
    user: User;
    token: string;
}
