import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store.js"; // or `import store from './store.js'` if default export
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>   {/* ✅ Correct prop name */}
      <App />
    </Provider>
  </StrictMode>
);
