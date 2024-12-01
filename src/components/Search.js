import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import ProfilePicture from "./ProfilePicture";

const Search = ({ currentUser }) => {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce the query input to optimize API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Delay in milliseconds before making the API call
    return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount
  }, [query]);

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery); // Update query state with input value

    // If the query is empty, clear the results
    if (searchQuery.length === 0) {
      setQueryResults([]);
      return;
    }

    setLoading(true); // Start loading state

    try {
      const response = await fetch(
        `https://localhost:7037/api/Users/search?query=${debouncedQuery}`,
        { method: "GET" }
      );
      if (response.ok) {
        const data = await response.json();
        setQueryResults(data); // Set the query results from the response
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setQueryResults([]);
    }

    setLoading(false); // End loading state
  };

  return (
    <div>
      <div className="w-[50vw] flex items-center justify-center">
        <CiSearch className="bg-black text-white rounded-l-md text-4xl h-10 p-2" />
        <input
          onChange={handleSearch} // Trigger handleSearch when input changes
          value={query} // Bind the input value to the query state
          type="text"
          placeholder="Search user to chat with..."
          className="bg-black text-white rounded-r-md text-md outline-none h-10 pl-1 w-full"
        />
      </div>

      <div className="w-[50vw] flex items-center justify-center bg-black my-2 rounded-md">
        {/* Show loading indicator */}
        {loading && <p className="text-white">Loading...</p>}

        {/* Display search results or "No results found" */}
        {queryResults.length > 0 ? (
          <div className="w-full mx-1">
            {queryResults.filter(user => user.id !== currentUser.id).map((user) => (
              <div
                key={user.id}
                className="my-1 bg-white w-full h-full rounded flex justify-start items-center p-2 hover:bg-gray-200 cursor-pointer"
              >
                <div>
                  <ProfilePicture userId={user.id} />
                </div>
                {user?.username}
              </div>
            ))}
          </div>
        ) : query.length > 0 ? (
          <p className="text-white">No results found</p> // Show "No results found" if query is not empty
        ) : null}
      </div>
    </div>
  );
};

export default Search;
