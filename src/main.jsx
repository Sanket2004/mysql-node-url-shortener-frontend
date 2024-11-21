import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@material-tailwind/react";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <ThemeProvider>
      <App />
      <Toaster
        position="bottom-right"
        containerStyle={{ borderRadius: 16, fontSize: 15 }}
      />
    </ThemeProvider>
  </BrowserRouter>
  // </StrictMode>,
);
