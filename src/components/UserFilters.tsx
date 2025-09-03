import { useMemo } from "react";
import CustomInput from "../UI/CustomInput";
import type { User } from "../types/User";

type Filters = {
  streetNumber: string;
  street: string;
  gender: string;
};

interface UserFilterProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  users: User[] | [];
}

const UserFilters = ({ filters, setFilters, users }: UserFilterProps) => {
  const genders = useMemo(() => {
    const all = users.map((u) => u.gender).filter(Boolean);
    return Array.from(new Set(all));
  }, [users]);

  return (
    <div className="userFilterContainer">
      <CustomInput
        type="text"
        label="Number street"
        placeholder="Number street"
        value={filters.streetNumber}
        onChange={(e) =>
          setFilters({ ...filters, streetNumber: e.target.value })
        }
      />

      <div className="containerInput">
        <label>Number Street</label>

        <select
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        >
          <option value="">All</option>
          {genders.map((g, i) => (
            <option key={i} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <CustomInput
        type="text"
        label="Street"
        placeholder="Street"
        value={filters.street}
        onChange={(e) => setFilters({ ...filters, street: e.target.value })}
      />
    </div>
  );
};

export default UserFilters;
