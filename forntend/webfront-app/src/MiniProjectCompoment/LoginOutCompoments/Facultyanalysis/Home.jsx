import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LogoutComponent from "./Logout";
import LoginComponent from "./login/Login";
import WelcomeComponent from "./Welcome";
import HeaderComponent from "./Header/Header";
import FotterComponent from "./Footer";
import VerificationCompoment from "./Verifications/verificationCompoment";
import OtpInput from "./login/Verify";
import TodoComponent from "./Profile";
import AttendanceList from "./StudentDetails/OnlyStudentValidity/attendence";
import { StudentPicturesx } from "./imagecheck";
import ForgetPasswordDataComp from "./Verifications/forgetPasswordDataComp";
import AuthProvider, { useAuth } from "./security/AuthContext";
import ForgotPassword from "./Verifications/ForgotPassword";
import StudentPictures from "./imagecheck";
import StudentPictures1 from "./imagecheck";
import MiddlePhase from "./StudentDetails/MiddlePhase";
import MiddlePhaseD from "./StudentDetails/DeepthDetails/MiddlePhase";

function AuthenticationRouter({ children }) {
  const auth = useAuth();

  if (auth.isTokenValid) return children;
  return <Navigate to="/" />;
}
export default function Home() {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<LoginComponent />}>
              {" "}
            </Route>
            <Route path="/login" element={<LoginComponent />}>
              {" "}
            </Route>
            <Route path="/reports" element={<MiddlePhase />}>
              {" "}
            </Route>
            <Route path="/verify" element={<OtpInput />}>
              {" "}
            </Route>
            <Route
              path="/auth/verifyEmail/*"
              element={<VerificationCompoment />}
            >
              {" "}
            </Route>
            <Route
              path="/auth/forgetpassword/*"
              element={<ForgetPasswordDataComp />}
            >
              {" "}
            </Route>

            <Route path="/forgetpassword" element={<ForgotPassword />}>
              {" "}
            </Route>
            <Route
              path="/welcome"
              element={
                <>
                  {/* <HeaderComponent /> */}
                  <AuthenticationRouter>
                    <WelcomeComponent />
                  </AuthenticationRouter>
                </>
              }
            >
              {" "}
            </Route>
            <Route
              path="/testing"
              element={
                <>
                  {/* <HeaderComponent /> */}
                  <AuthenticationRouter>
                    <StudentPictures />
                  </AuthenticationRouter>
                </>
              }
            >
              {" "}
            </Route>
            <Route
              path="/testing1"
              element={
                <>
                  {/* <HeaderComponent /> */}
                  <AuthenticationRouter>
                    <StudentPictures1 />
                  </AuthenticationRouter>
                </>
              }
            >
              {" "}
            </Route>
            <Route
              path="/testingX"
              element={
                <>
                  {/* <HeaderComponent /> */}
                  <AuthenticationRouter>
                    <StudentPicturesx />
                  </AuthenticationRouter>
                </>
              }
            >
              {" "}
            </Route>
            <Route
              path="/tablesdata"
              element={
                <>
                  <HeaderComponent />
                  <AuthenticationRouter>
                    <WelcomeComponent />
                  </AuthenticationRouter>
                </>
              }
            >
              {" "}
            </Route>
            <Route
              path="/d/reports"
              element={
                <>
                  {/* <HeaderComponent /> */}
                  <AuthenticationRouter>
                    <MiddlePhaseD />
                  </AuthenticationRouter>
                </>
              }
            >
              {" "}
            </Route>
            <Route
              path="/today/reports"
              element={
                <>
                  {/* <HeaderComponent /> */}
                  <AuthenticationRouter>
                    <AttendanceList />
                  </AuthenticationRouter>
                </>
              }
            >
              {" "}
            </Route>
            <Route
              path="/logout"
              element={
                <>
                  <HeaderComponent /> <LogoutComponent />
                </>
              }
            >
              {" "}
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>

      {/* <FotterComponent/> */}
    </div>
  );
}
