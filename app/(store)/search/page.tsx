import React from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  let params = { search:query || null}

  


  // console.log(posts)
  return (
    <div>
      <h1>Search Results</h1>
      <p>Query: {query}</p>
      {/* Add logic to display search results */}
    </div>
  );
};


