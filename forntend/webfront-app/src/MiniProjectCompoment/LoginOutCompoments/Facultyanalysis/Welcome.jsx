import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import AttendancePages from "./testing";
import { displayImages } from "./imagecheck";
function WelcomeComponent() {
  const navigate = useNavigate();
  const authContext = useAuth();

  console.log(authContext);
  return (
    <div className="WelcomeComponent">
      {/* <AttendancePages></AttendancePages> */}
      {/* <displayImages></displayImages> */}
      <h1>Welcome {authContext.username}</h1>
      Report Our Class-Addentence{" "}
      <button
        onClick={() => {
          navigate(`/tables`);
        }}
      >
        {" "}
        click here
      </button>
    </div>
  );
}
export default WelcomeComponent;
