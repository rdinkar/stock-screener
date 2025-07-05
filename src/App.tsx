import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
} from "react-router-dom";
import { Menu } from "antd";
import Dashboard from "./components/Dashboard";
import StockDetail from "./components/StockDetail";
import Watchlist from "./components/Watchlist";
import {
  DashboardOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import "./App.css";

function Screener() {
  return <h2>Stock Screener Page</h2>;
}

function Navigation() {
  const location = useLocation();
  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[
        location.pathname.startsWith("/stock/")
          ? "/stock/:id"
          : location.pathname,
      ]}
      style={{ height: "calc(100% - 64px)", borderRight: 0 }}
    >
      <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="/screener" icon={<SearchOutlined />}>
        <Link to="/screener">Screener</Link>
      </Menu.Item>
      <Menu.Item key="/watchlist" icon={<UnorderedListOutlined />}>
        <Link to="/watchlist">Watchlist</Link>
      </Menu.Item>
    </Menu>
  );
}

function App() {
  return (
    <Router>
      <div className="flex h-100 over-auto">
        <div className="sidebar">
          <div className="brand-logo">Stock Screener</div>
          <Navigation />
        </div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stock/:id" element={<StockDetail />} />
          <Route path="/screener" element={<Screener />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
