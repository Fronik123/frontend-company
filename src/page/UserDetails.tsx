import { useNavigate, useParams } from "react-router-dom";
import UsersContext from "../context/UsersContext";
import { useContext } from "react";
import UserCard from "../components/UserCard";

function UserDetails() {
  const route = useNavigate();
  const { id } = useParams();

  const { users } = useContext(UsersContext);

  const user = users.find((item) => item.id === id);

  if (!user) return <div>No find user</div>;

  const handleBack = () => {
    route(-1);
  };

  return (
    <div className="wrapperContainer">
      <h1 style={{ textAlign: "center", padding: "25px" }}>User Detail</h1>

      <UserCard user={user} moreInfo />

      <button onClick={handleBack}>Back to List</button>
    </div>
  );
}

export default UserDetails;
