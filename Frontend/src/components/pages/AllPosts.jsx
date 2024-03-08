import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../index";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  //
  // const path = "https://blog-app-backend-c9w1.onrender.com/api/v1";

  useEffect(() => {
    const data = async () => {
      try {
        const res = await axios.get(`/api/v1/listing/get`);
        // console.log(res);
        setPosts(res.data.data);
      } catch (error) {
        console.log(error, "error in allposts");
      }
    };
    data();
  }, []);

  if (posts.length == 0) {
    return (
      <div className="flex items-center justify-center text-white min-h-screen">
        <Box>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (posts) {
    return (
      <div className="p-7">
        <h1 className="text-4xl font-bold text-center text-white  ">
          All Posts
        </h1>
        <div className="w-full py-8 ">
          <Container>
            <div className="flex flex-wrap">
              {posts.map((post) => (
                <div key={post.$id} className="p-2 sm:w-[50%]">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
    );
  }
}
export default AllPosts;
