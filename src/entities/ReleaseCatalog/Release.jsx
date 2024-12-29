import {React, useEffect, useState } from "react";
import { $api } from "../../api/apiAnime";

import { usePagination } from "../../app/providers/PaginationProvider";

import CatalogSelect from "../../shared/UI/Select/CatalogSelect";
import ReleaseCard from "./ReleaseCard/ReleaseCard";
import Filter from "../Filter/Fitlter";
import Pagination from "../../features/Pagination/Pagination";
import styles from "../ReleaseCatalog/Release.module.scss";

const Release = () => {
  const [release, setRelease] = useState([]);
  const { currentPage, setCurrentPage } = usePagination();
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    genres: [],
    type: "",
    releaseStatus: "",
    voiceStatus: "",
    seasons: [],
    ageRating: "",
    fromYear: 1996,
    toYear: 2025,
  });
  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    fetchReleases();
  }, [filters, currentPage]);

  const fetchReleases = async () => {
    setLoading(true);
    setError(null);

    const params = {
      page: currentPage,
      limit: 25,
      ...(filters.genres.length > 0 && {
        "f[genres]": filters.genres.join(","),
      }),
      ...(filters.type && { "f[types]": filters.type }),
      ...(filters.releaseStatus && {
        "f[publish_statuses]": filters.releaseStatus,
      }),
      ...(filters.voiceStatus && {
        "f[production_statuses]": filters.voiceStatus,
      }),
      ...(filters.seasons.length > 0 && {
        "f[seasons]": filters.seasons.join(","),
      }),
      ...(filters.ageRating && { "f[age_ratings]": filters.ageRating }),
      ...(filters.fromYear && { "f[years][from_year]": filters.fromYear }),
      ...(filters.toYear && { "f[years][to_year]": filters.toYear }),
    };

    try {
      const response = await $api.get("/anime/catalog/releases", { params });
      setRelease(response.data.data);
      setTotalPage(response.data.meta.pagination.total_pages);
    } catch (error) {
      setError("Ошибка при загрузке данных");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      genres: [],
      type: "",
      releaseStatus: "",
      voiceStatus: "",
      seasons: [],
      ageRating: "",
      fromYear: 1996,
      toYear: 2025,
    });
    setCurrentPage(1);
  };

  const SortAnime = (sort) => {
    setSelectedSort(sort);
    const sortedReleases = [...release].sort((a, b) => {
      if (sort === "updated_at")
        return new Date(b.updated_at) - new Date(a.updated_at);
      return a.name.main.localeCompare(b.name.main);
    });
    setRelease(sortedReleases);
  };

  return (
    <div className={styles.container}>
      <h1>Каталог</h1>
      <div className={styles.catalog}>
        <div className={styles.catalog_left}>
          <CatalogSelect
            value={selectedSort}
            onChange={SortAnime}
            options={[
              { value: "name.main", name: "По названию" },
              { value: "updated_at", name: "По обновлению" },
            ]}
          />
          {error && <p>{error}</p>}
          <div className={styles.cards}>
            {loading
              ? Array.from({ length: 25 }).map((_, index) => (
                  <ReleaseCard key={index} loading={true} />
                ))
              : release.map((anime) => (
                  <ReleaseCard key={anime.id} anime={anime} loading={false} />
                ))}
          </div>
          {!loading && <Pagination totalPage={totalPage} />}
        </div>
        <div className={styles.catalog_right}>
          <h4>Фильтр</h4>
          <Filter applyFilters={applyFilters} resetFilters={resetFilters} />
        </div>
      </div>
    </div>
  );
};

export default Release;
