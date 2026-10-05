"use client";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import { movies } from "./data/movies";
import { useState, useEffect } from "react";
import GenreFilter from "./components/Genre";
import SortByDate, { SortOrder } from "./components/SortByDate";

export default function Home() {
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [genres, setGenres] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  useEffect(() => {
    const updatedMovies = movies.filter((movie) => {
      return genres.length === 0 || genres.includes(movie.genre);
    });

    // filter() returns a new array, so sorting it won't change the original list
    if (sortOrder === "newest") {
      updatedMovies.sort((a, b) => b.releaseYear - a.releaseYear);
    } else if (sortOrder === "oldest") {
      updatedMovies.sort((a, b) => a.releaseYear - b.releaseYear);
    }

    setFilteredMovies(updatedMovies);
  }, [genres, sortOrder]);

  return (
    <div className="bg-slate-600 min-h-screen h-full">
      <Header />
      <GenreFilter setGenres={setGenres} selectedGenres={genres} />
      <SortByDate sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <div className="grid grid-cols-4 p-8 gap-4">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}