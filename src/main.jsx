import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css"; // Import this instead for AntD 5.x
import { customAntdTheme } from "./theme/theme.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider theme={customAntdTheme}>
      <App />
    </ConfigProvider>
  </StrictMode>
);
