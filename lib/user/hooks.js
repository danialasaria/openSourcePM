import { fetcher } from '@/lib/fetch';
import useSWR from 'swr';

/* returns
  {
  "user": {
    "username": "jane",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
*/
export function useCurrentUser() {
  return useSWR('/api/user', fetcher);
}

export function useUser(id) {
  return useSWR(`/api/users/${id}`, fetcher);
}
