import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import ThemeProvider from "../providers/ThemeProvider";
import { PaginationProvider } from "../providers/PaginationProvider";
import Layout from "../../widgets/Layout/Layout";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const Catalog = lazy(() => import("../../pages/Catalog/Catalog"));
const DetailPage = lazy(() => import("../../pages/AnimeDetailsPage/DetailPage"));
const ScheduleWeek = lazy(() =>
  import("../../entities/Schedule/ScheduleWeek/ScheduleWeek")
);
const Genres = lazy(() => import("../../entities/Genres/Genres"));
const GenresDetailPage = lazy(() =>
  import("../../pages/GanreDetailPage/GanreDetailPage")
);

function App() {
  return (
    <ThemeProvider>
      <PaginationProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="genres" element={<Genres />} />
              <Route path="genres/:alias" element={<GenresDetailPage />} />
              <Route path="schedule" element={<ScheduleWeek />} />
              <Route path="title/:alias" element={<DetailPage />} />
            </Route>
          </Routes>
        </div>
      </PaginationProvider>
    </ThemeProvider>
  );
}

export default App;
