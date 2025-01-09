import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "./components/ui/provider.jsx";
import { Toaster } from "./components/ui/toaster.jsx";

createRoot(document.getElementById("root")).render(
  <Provider>
    {/*<StrictMode>*/}
    <App />
    <Toaster />
  </Provider>,
  {
    /*</StrictMode>*/
  },
);
