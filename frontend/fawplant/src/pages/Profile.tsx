import defaultUserImage from "../assets/default_user.png";
import { useSelector } from "react-redux";
import { RootState } from "../utils/redux/store";

const Profile = () => {
    const { name, mobile, email, profileUrl } = useSelector(
        (state: RootState) => state.profile
    );

    return (
        <div className="profile-container">
            <div className="profile-image-container">
                <img
                    src={profileUrl ? profileUrl : defaultUserImage}
                    alt="Profile"
                />
            </div>
            <div className="profile-details-container">
                <h2>Profile Details</h2>
                <div>
                    <span>Name:</span> {name}
                </div>
                <div>
                    <span>Email:</span> {email}
                </div>
                <div>
                    <span>Mobile Number:</span> {mobile ? mobile : "N/A"}
                </div>
            </div>
            <style>{`
                .profile-container {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    margin-top: 50px;
                }
                .profile-image-container {
                    margin-right: 30px;
                }
                .profile-image-container img {
                    height: 200px;
                    width: 200px;
                    object-fit: cover;
                    border-radius: 50%;
                }
                .profile-details-container {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }
                .profile-details-container span {
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
};
export default Profile;
