import React, { useState } from 'react';

const MovieSearch = () => {
    const [searchTerm, setSearchTerm] = useState(""); 
    const [movies, setMovies] = useState([]);      
    const [error, setError] = useState("");

    const API_KEY = "bf6ec434"; 

    const searchMovies = async () => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
            const data = await response.json();

            if (data.Response === "True") {
                setMovies(data.Search); 
                setError(""); 
            } else {
                setError(data.Error); 
                setMovies([]); 
            }
        } catch (error) {
            setError("Something went wrong. Please try again later."); 
            setMovies([]); 
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Movie Search App</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a movie..."
                style={{
                    padding: "10px",
                    margin: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                }}
            />
            <button
                onClick={searchMovies}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Search
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {movies.map((movie) => (
                    <div
                        key={movie.imdbID}
                        style={{
                            margin: "10px",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            width: "200px",
                        }}
                    >
                        <img
                            src={
                                movie.Poster !== "N/A"
                                    ? movie.Poster
                                    : "https://via.placeholder.com/150"
                            }
                            alt={movie.Title}
                            style={{ width: "100%" }}
                        />
                        <h3>{movie.Title}</h3>
                        <p>{movie.Year}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieSearch;
