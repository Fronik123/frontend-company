import { useState } from "react";
import UsersContext from "./UsersContext";
import type { ReactNode } from "react";
import type { User } from "../types/User";

const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
