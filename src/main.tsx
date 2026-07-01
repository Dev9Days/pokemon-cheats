import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";
import { installCloudflareAnalytics } from "./utils/cloudflareAnalytics";
import { normalizeAppRoute } from "./utils/routing";

normalizeAppRoute();
createRoot(document.getElementById("root")!).render(<App />);
installCloudflareAnalytics();

