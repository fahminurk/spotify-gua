import "./App.css";
import { Routes } from "react-router-dom/dist";
import { Route } from "react-router-dom";
// import HomePage from "./pages/homepage";
// import LoginPage from "./pages/loginPage";
// import RegisterPage from "./pages/registerPage";
import { useEffect, useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import routes from "./routes/Routes";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Center w="100vw" h="100vh">
          <Spinner size={"xl"} />
        </Center>
      ) : (
        <Routes>{routes.map((val) => val)}</Routes>
      )}
    </>
  );
}

export default App;

{
  /* <Route
            path="/"
            element={<HomePage setLoading={setLoading} />}
          ></Route>
          <Route
            path="/login"
            element={<LoginPage setLoading={setLoading} />}
          ></Route>
          <Route
            path="/Register"
            element={<RegisterPage setLoading={setLoading} />}
          ></Route> */
}
