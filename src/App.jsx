import { useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { HOME, COLLECTION, REDEEM_CODE, SHOP } from "./constants/Pages";
import * as styles from "./css/App.module.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Collection from "./pages/Collection";
import PageNotFound from "./pages/PageNotFound";
import RedeemCode from "./pages/RedeemCode";
import Shop from "./pages/Shop";
import useStore from "./Store";

function App() {
  const currentUser = useStore((state) => state.currentUser);
  const setIsMobile = useStore((state) => state.setIsMobile);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setIsMobile(window.innerWidth < 765)
    );
  }, []);

  return (
    <div className={styles.body}>
      <Router>
        <Header />
        {currentUser ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={HOME} element={<Navigate to="/" />} />
            <Route path={SHOP} element={<Shop />} />
            <Route path={COLLECTION} element={<Collection />} />
            <Route path={REDEEM_CODE} element={<RedeemCode />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        )}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
