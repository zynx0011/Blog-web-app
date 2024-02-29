import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => {
    state.auth.status;
  });
  useEffect(() => {
    const data = async () => {
      try {
        const res = await axios.get("/api/v1/listing/get");
        console.log(res);
        setPosts(res.data.data);
      } catch (error) {
        console.log(error, "error in allposts");
      }
    };
    data();
  }, []);

  if (posts.length == 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold hover:text-gray-800">Loading...</h1>
      </div>
    );
  }

  if (posts) {
    return (
      <div className="w-full py-8 ">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}
export default AllPosts;
