import React from "react";

interface SearchPageProps {
  searchParams: Record<string, string | undefined>; // Allow an object with string or undefined values
}

const SearchPage: React.FC<SearchPageProps> = ({ searchParams }) => {
  const query = searchParams.query || ""; // Fallback to an empty string if undefined

  return (
    <div>
      <h1>Search Results</h1>
      <p>Query: {query}</p>
      {/* Add logic to display search results */}
    </div>
  );
};

export default SearchPage;
