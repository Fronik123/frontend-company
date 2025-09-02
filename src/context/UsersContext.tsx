import { createContext } from "react";

import type { User } from "../types/User";

interface UsersContextType {
  users: User[];
  setUsers: (users: User[]) => void;
}

const UsersContext = createContext<UsersContextType>({
  users: [],
  setUsers: () => {},
});

export default UsersContext;
