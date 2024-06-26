import ProfileActions from "@/components/Profile/UserInfo/ProfileActions";
import ProfileHeader from "@/components/Profile/UserInfo/ProfileHeader";

export default function UserInfo({ username }: { username: string }) {
  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <ProfileHeader username={username} />
            <ProfileActions />
          </div>
        </div>
      </div>
    </div>
  );
}
