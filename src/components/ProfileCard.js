import "../css/ProfileCard.css";

const ProfileCard = ({ profile, logOut, button }) => {
  return (
    <div class="Profile-card">
      <div class="card-border-top"></div>
      <div
        class="img"
        style={{
          backgroundImage: `url(${profile?.picture ? profile.picture : ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <span>{profile.name ? profile.name : "No Name"}</span>
      <p class="job">{profile.email ? profile.email : "No Email"}</p>
      {profile.name !== "John Doe" ? (
        <button onClick={logOut}> Log Out</button>
      ) : (
        <button onClick={() => button.click()}> Log In</button>
      )}
    </div>
  );
};

export default ProfileCard;
