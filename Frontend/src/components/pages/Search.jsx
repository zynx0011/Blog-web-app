import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const navigate = useNavigate();

  // Perform search action with searchTerm and sortBy
  useEffect(() => {
    const func = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const searchQuery = urlParams.toString();
        // console.log(searchQuery);

        const res = await axios.get(`/api/v1/listing/search?${searchQuery}`);
        setSearchResults(res.data.data?.listing);
      } catch (error) {
        console.log(error);
      }
    };

    func();
  }, [location.search]);
  // You can implement the search logic here

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const urlParams = new URLSearchParams();
      urlParams.set("searchTerms", searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" mx-auto mt-8 flex items-start flex-col sm:flex-row  gap-8 sm:min-h-screen">
      <div className="flex gap-4 mr-4 items-center ml-5 sm:ml-0 mb-4 flex-col p-3 sm:border-r-2 sm:min-h-screen">
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            placeholder="Enter search term..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />

          <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <p className="text-xl font-bold mb-4 text-white">Search Results</p>

        {/* Display search results here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-white">
          {searchResults &&
            searchResults.map((item) => (
              <Link to={`/post/${item._id}`}>
                <div
                  key={item._id}
                  className="p-4 border border-gray-300 rounded-md"
                >
                  <img
                    src={item.featuredImage}
                    alt=""
                    className="w-full h-auto mb-2 rounded-md"
                  />
                  <p className="text-lg font-semibold">{item.title}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
