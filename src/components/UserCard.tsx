import { useState } from "react";
import type { User } from "../types/User";
import Avatar from "react-avatar";

interface UserCardProps {
  user: User;
  moreInfo?: boolean;
}

function UserCard({ user, moreInfo = false }: UserCardProps) {
  const [isMoreInfo, setIsmoreInfo] = useState(false);

  if (!user) {
    return <div style={{ padding: 12 }}>No user data</div>;
  }

  const renderInfo = (title: string, field: string) => {
    return (
      <div className="wrapperInfoUser">
        <p>{title}</p>
        <p>{field}</p>
      </div>
    );
  };

  return (
    <div className="wrapperUserCard">
      <Avatar
        name={user.firstName}
        size="50"
        round={true}
        style={{ margin: "10px" }}
      />

      <div className="wrapperUserName">
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
      </div>

      <div>
        {renderInfo("Email:", user.email)}
        {renderInfo("Street:", user.street)}
        {renderInfo("Street Number:", user.streetNumber)}

        {moreInfo && (
          <button onClick={() => setIsmoreInfo(!isMoreInfo)}>
            {isMoreInfo ? <p>less information</p> : <p>Show more info</p>}
          </button>
        )}

        {isMoreInfo && (
          <>
            {renderInfo("Post Code:", user.postCode)}
            {renderInfo("Gender:", user.gender)}
            {renderInfo("City:", user.city)}
          </>
        )}
      </div>
    </div>
  );
}

export default UserCard;
