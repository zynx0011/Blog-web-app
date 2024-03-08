import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostCard } from "..";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Myposts = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const data = async () => {
      try {
        setError(false);
        setError(true);
        setSuccess(false);
        const res = await axios.get(`/api/v1/listing/my-posts/${params.id} `);
        // console.log(res.data.data);
        setPosts(res.data.data);
        setSuccess(true);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
        setError(true);
        setSuccess(false);
      }
    };

    data();
  }, [params.id]);

  if (!posts.length) {
    return (
      <h1 className="text-4xl font-bold text-center text-white ">No posts</h1>
    );
  }

  return loading ? (
    <div className="flex items-center justify-center text-white min-h-screen">
      <Box>
        <CircularProgress />
      </Box>
    </div>
  ) : (
    <div className="p-7 ">
      <h1 className="text-4xl font-bold text-center text-white">My Posts</h1>
      <div className="w-full py-8 ">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post._id} className="p-2 sm:w-[50%]">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Myposts;
