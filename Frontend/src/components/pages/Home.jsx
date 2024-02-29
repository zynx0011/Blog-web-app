import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);
  const [mess, setMess] = useState("GO TO Login Page");

  useEffect(() => {
    const data = async () => {
      try {
        const res = await axios.get("/api/v1/listing/get");
        console.log(res);
        setPosts(res.data.data);
      } catch (error) {
        console.log(error, "error in home");
      }
    };
    data();
  }, []);

  // const userData = useSelector((state) => {
  //   state.auth.status;
  // });

  // if (!login) {
  //   return (
  //     <Link to={"/add-post"}>
  //       <h1>Please Add Post </h1>
  //     </Link>
  //   );
  // }
  const authStatus = useSelector((state) => state.auth.status);

  if (!authStatus) {
    return (
      <div
        id="bg1"
        className="w-full py-8  text-center bg-[url(bg2.jpg)] bg-cover mt-0  bg-no-repeat"
      >
        <Container>
          <div className="flex flex-wrap min-h-screen scroll-smooth items-center justify-center  ">
            <div className="p-3 w-[40vw]   rounded-lg  border border-white  backdrop-blur-md h-[40vh] items-center  flex justify-center ">
              <Link to={"/login"}>
                {" "}
                <h1 className="text-4xl font-bold text-white duration-150 ">
                  Login to read posts
                </h1>{" "}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length == 0) {
    return (
      <div className="p-4 my-7 max-h-screen ">
        <h1 className="font-bold text-4xl my-6 text-center min-h-screen ">
          <Link to={"/add-post"}>Please Add The Post</Link>
        </h1>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts &&
            posts.length > 0 &&
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
