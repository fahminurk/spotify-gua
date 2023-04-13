import { Route } from "react-router-dom";
import HomePage from "../pages/homepage";
import LoginPage from "../pages/loginPage";
import RegisterPage from "../pages/registerPage";
import ProtectedPage from "./ProtectedPage";

const routes = [
  <Route
    path="/"
    element={
      <ProtectedPage guestOnly={false} needLogin={true}>
        <HomePage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/login"
    element={
      <ProtectedPage needLogin={false} guestOnly={true}>
        <LoginPage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/Register"
    element={
      <ProtectedPage needLogin={false} guestOnly={true}>
        <RegisterPage />
      </ProtectedPage>
    }
  />,
];

export default routes;
