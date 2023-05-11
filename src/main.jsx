import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ReactFlowProvider } from "reactflow";

import "./index.scss";
import "reactflow/dist/style.css";
import 'reactflow/dist/base.css';



ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
  // </React.StrictMode>,
);
