import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
} from "react-router-dom";
import { Menu } from "antd";
import DashboardPage from "./pages/DashboardPage";
import StockDetailPage from "./pages/StockDetailPage";
import WatchlistPage from "./pages/WatchlistPage";
import ScreenerPage from "./pages/ScreenerPage";
import {
  DashboardOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import "./styles/App.css";

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
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/stock/:id" element={<StockDetailPage />} />
          <Route path="/screener" element={<ScreenerPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
