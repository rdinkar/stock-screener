import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Menu } from "antd";
import {
  DashboardOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import "./App.css";

function Dashboard() {
  return <h2>Dashboard Home</h2>;
}
function StockDetail() {
  return <h2>Stock Detail Page</h2>;
}
function Screener() {
  return <h2>Stock Screener Page</h2>;
}
function Watchlist() {
  return <h2>Watchlist Management Page</h2>;
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
      style={{ height: "100%", borderRight: 0 }}
    >
      <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
        <a href="/dashboard">Dashboard</a>
      </Menu.Item>
      <Menu.Item key="/screener" icon={<SearchOutlined />}>
        <a href="/screener">Screener</a>
      </Menu.Item>
      <Menu.Item key="/watchlist" icon={<UnorderedListOutlined />}>
        <a href="/watchlist">Watchlist</a>
      </Menu.Item>
    </Menu>
  );
}

function App() {
  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div style={{ width: 220, background: "#001529" }}>
          <div
            className="logo"
            style={{
              height: 32,
              margin: 16,
            }}
          >
            Stock Screener
          </div>
          <Navigation />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <header style={{ background: "#fff", padding: 0, minHeight: 48 }} />
          <main style={{ margin: "24px 16px 0", flex: 1 }}>
            <div style={{ padding: 24, minHeight: 360, background: "#fff" }}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/stock/:id" element={<StockDetail />} />
                <Route path="/screener" element={<Screener />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
