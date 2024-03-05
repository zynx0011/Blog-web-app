import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCardPg from "../PostCardPg";
import { PostCard } from "..";
const Myposts = () => {
  const [posts, setPosts] = useState([]);
  //   console.log(posts);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const data = async () => {
      try {
        setError(false);
        setSuccess(false);
        const res = await axios.get(`/api/v1/listing/my-posts/${params.id} `);
        // console.log(res.data.data);
        setPosts(res.data.data);
        setSuccess(true);
      } catch (error) {
        console.log(error);
        setError(true);
        setSuccess(false);
      }
    };

    data();
  }, [params.id]);

  if (posts) {
    return (
      <div className="p-7 ">
        <h1 className="text-4xl font-bold text-center">My Posts</h1>
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
};

export default Myposts;
