import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

const MediaList = lazy(() => import("./pages/MediaList"));
const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Detail = lazy(() => import("./pages/Detail"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <Suspense fallback={<Loading />}>
              <Detail mediaType="movie" />
            </Suspense>
          }
        />
        <Route
          path="/tv/:id"
          element={
            <Suspense fallback={<Loading />}>
              <Detail mediaType="tv" />
            </Suspense>
          }
        />
        <Route
          path="/movie"
          element={
            <Suspense fallback={<Loading />}>
              <MediaList mediaType="movie" />
            </Suspense>
          }
        />
        <Route
          path="/tv"
          element={
            <Suspense fallback={<Loading />}>
              <MediaList mediaType="tv" />
            </Suspense>
          }
        />
        <Route
          path="/search"
          element={
            <Suspense fallback={<Loading />}>
              <Search />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
