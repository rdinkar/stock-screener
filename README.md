## Folder Structure

```
src/
  assets/         # Mock data and static files
  components/     # Reusable UI components (MetricCard, StockTable, etc.)
  features/       # Redux slices and custom hooks (useScreenerHandlers, etc.)
  pages/          # Route-level page composers (DashboardPage, etc.)
  styles/         # Utility and global CSS
  utils/          # Helpers (filters, table columns, etc.)
```

## Setup & Development

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
2. **Start the dev server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Ant Design](https://ant.design/) (UI library)
- [ECharts](https://echarts.apache.org/) (charts)
- [DnD Kit](https://dndkit.com/) (drag-and-drop)

## License

MIT
