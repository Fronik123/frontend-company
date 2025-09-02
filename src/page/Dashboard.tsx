import { useContext, useEffect, useMemo, useState } from "react";
import type { User } from "../types/User";
import { v4 as uuidv4 } from "uuid";

import UserCard from "../components/UserCard";
import { useNavigate } from "react-router-dom";
import UsersContext from "../context/UsersContext";
import { Virtuoso } from "react-virtuoso";
import UserFilters from "../components/UserFilters";

const URI_API = "http://localhost:5174";

function Dashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { users, setUsers } = useContext(UsersContext);

  const [filters, setFilters] = useState({
    streetNumber: "",
    gender: "",
    street: "",
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${URI_API}/public/customers.json`);

      const data = await response.json();

      const dataWithId = data.map((item: User) => ({
        ...item,
        id: uuidv4(),
      }));

      setUsers(dataWithId);
    } catch (error) {
      console.error("error", error);
      setError("Something wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDetailsUser = (id: string) => {
    navigate(`/details/${id}`);
  };

  const filteredUsers = useMemo(() => {
    const filterNumber = filters.streetNumber.trim().toLowerCase();
    const filterGender = filters.gender.trim().toLowerCase();
    const filterStreet = filters.street.trim().toLowerCase();

    return users.filter((u: User) => {
      const streetNum = String(u.streetNumber ?? "").toLowerCase();
      const streetName = String(u.street ?? "").toLowerCase();
      const gender = String(u.gender ?? "").toLowerCase();

      return (
        (!filterNumber || streetNum.includes(filterNumber)) &&
        (!filterGender || gender === filterGender) &&
        (!filterStreet || streetName.includes(filterStreet))
      );
    });
  }, [users, filters]);

  return (
    <div className="wrapperContainer">
      <h2 style={{ textAlign: "center" }}>Dashboard</h2>

      <UserFilters setFilters={setFilters} filters={filters} users={users} />

      {isLoading && <p>loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <Virtuoso
        style={{ height: "600px", width: "100%" }}
        totalCount={filteredUsers.length}
        data={filteredUsers}
        itemContent={(_, user) => (
          <div
            onClick={() => handleDetailsUser(user.id)}
            style={{ cursor: "pointer" }}
          >
            <UserCard user={user} />
          </div>
        )}
      />
    </div>
  );
}

export default Dashboard;
