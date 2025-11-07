import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux"; // <-- Redux Provider
import App from "./App";
import { FavProvider } from "./Context/FavContext";
import { store } from "./types/store"; // <-- your Redux store
import "./index.css";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap Redux */}
      <FavProvider>          {/* Wrap your context */}
        <HashRouter>
          <Toaster position="top-right" reverseOrder={false} />
          <App />
        </HashRouter>
      </FavProvider>
    </Provider>
  </StrictMode>
);


