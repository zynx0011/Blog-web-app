import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const data = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/listing/get");
        console.log(res);
        setPosts(res.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log(error, "error in home");
      }
    };
    data();
  }, []);

  return loading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <>
      {/* slider  */}
      <div className="w-full  h-[100vh]">
        <Slide
          duration={3500}
          autoplay={true}
          infinite={true}
          onChange={function noRefCheck() {}}
          onStartChange={function noRefCheck() {}}
        >
          {posts &&
            posts.length > 0 &&
            posts.map((post) => (
              <div className="each-slide-effect relative " key={post?._id}>
                <div className="w-full min-h-screen ">
                  <div
                    className="w-full h-[100vh] bg-cover bg-center"
                    style={{
                      backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${post?.featuredImage})`, //url(post?.featuredImage),
                    }}
                  >
                    <div className="absolute top-[29%] left-[13%] max-w-2xl flex flex-col gap-8">
                      <h1 className="sm:text-5xl text-xl w-[60%] font-bold text-[#464895] uppercase sm:w-[60%] text-center p-2 bg-[#f9eded] ">
                        {post?.title}
                      </h1>
                      <p className="sm:text-2xl w-[80%] sm:w-full font-bold text-[#f9eded]">
                        Multiple lines of text that form the lede, informing new
                        readers quickly and efficiently about what's most
                        interesting in this post's contents.
                      </p>
                      <Link
                        to={`/post/${post._id}`}
                        className="bg-[#3f418d] w-[44%] hover:bg-[#464895] sm:w-[24%] text-center text-[#f9eded] font-bold py-2 sm:mt-3 px-4 rounded"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slide>
      </div>

      {/* //card */}
      <div className="container mx-auto px-4  mt-12 py-8">
        <h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample blog post cards */}
          {posts &&
            posts.length > 0 &&
            posts.map((post) => (
              <Link to={`/post/${post._id}`}>
                <div
                  key={post._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={post.featuredImage}
                    alt="Blog Post"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">
                      {post?.title}
                    </h2>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris lobortis odio id metus scelerisque, ut auctor magna
                      fermentum.
                    </p>
                    <a
                      href="#"
                      className="text-blue-500 font-semibold mt-4 inline-block"
                    >
                      Read more...
                    </a>
                  </div>
                </div>
              </Link>
            ))}
          {/* Repeat for other blog post cards */}
          {/* Example of a blog post card */}

          {/* End of blog post cards */}
        </div>
      </div>

      {/* about  */}
      <div className="div">
        {" "}
        <div className="bg-white shadow-md rounded-lg overflow-hidden md:flex mt-12">
          {/* User image */}
          <div className="md:w-1/3">
            <img
              src="https://media.licdn.com/dms/image/C4D03AQEH5EGs0OkeTw/profile-displayphoto-shrink_400_400/0/1544222558401?e=2147483647&v=beta&t=9J2nsw37uSb5_1q6yQ2E5Dlpzf4cr1j00uh___veQ9k"
              alt="User"
              className="w-full h-auto md:h-full object-cover object-center"
            />
          </div>
          {/* User information */}
          <div className="p-8 md:w-2/3">
            <h2 className="text-2xl font-bold mb-4 mt-10">About Me</h2>
            <p className="text-gray-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
              odio nec justo hendrerit finibus nec nec risus. Proin rhoncus nunc
              ac purus congue, vitae finibus ex varius. Mauris nec nibh euismod,
              placerat magna at, scelerisque velit. Sed sed maximus purus.
              Phasellus fermentum, nisi vel sagittis dapibus, nulla augue congue
              nunc, ut vehicula velit magna a tellus. Donec interdum elit vel
              nisi fermentum, sit amet consectetur magna rhoncus. Aenean non
              urna sit amet eros viverra accumsan ut id leo. Pellentesque ac
              venenatis ipsum. Vivamus auctor vitae velit ac lacinia. Cras vitae
              arcu auctor, pretium sem sed, dignissim ligula.
            </p>
            <p className="text-gray-700">
              Fusce varius euismod tortor vitae fermentum. Integer fermentum
              diam in ipsum tempor, nec dictum felis efficitur. Vestibulum
              bibendum, leo sed suscipit aliquam, enim neque congue nibh, id
              posuere magna ipsum eget orci.
            </p>
            <Link to={"/all-posts"}>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold
                py-2 mt-10 px-4 rounded"
              >
                Read My Blogs
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* email section */}
      <div class="relative mx-auto my-5 max-w-4xl mt-20 w-full mb-11 rounded-lg bg-indigo-100 shadow-lg">
        <div class="p-8 md:p-12 lg:px-16">
          <div class="max-w-lg">
            <h2 class="text-2xl font-bold text-indigo-900 md:text-3xl">
              Wanna Create a Blog?
            </h2>

            <p class="hidden text-indigo-900 sm:mt-4 sm:block">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              temporibus dicta mollitia!
            </p>
          </div>

          <div class="mt-8 max-w-xl">
            <form action="#" class="sm:flex sm:gap-4">
              {currentUser ? (
                <Link to={"/add-post"}>
                  <button class="group mt-4 flex w-full items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-indigo-400 sm:mt-0 sm:w-auto">
                    <span class="text-sm font-medium"> Add Post </span>

                    <svg
                      class="ml-3 h-5 w-5 transition-all group-hover:translate-x-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </Link>
              ) : (
                <Link to={"/signup"}>
                  <button class="group mt-4 flex w-full items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-indigo-400 sm:mt-0 sm:w-auto">
                    <span class="text-sm font-medium"> Sign Up </span>

                    <svg
                      class="ml-3 h-5 w-5 transition-all group-hover:translate-x-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </Link>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* card */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Popular Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample blog post cards */}
          {posts &&
            posts.length > 0 &&
            posts.map((post) => (
              <Link to={`/post/${post._id}`}>
                <div
                  key={post._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={post.featuredImage}
                    alt="Blog Post"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">
                      Blog Post Title
                    </h2>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris lobortis odio id metus scelerisque, ut auctor magna
                      fermentum.
                    </p>
                    <Link
                      to={`/post/${post._id}`}
                      className="text-blue-500 font-semibold mt-4 inline-block"
                    >
                      Read more...
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          {/* Repeat for other blog post cards */}
          {/* Example of a blog post card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://via.placeholder.com/800x400"
              alt="Blog Post"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Blog Post Title</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                lobortis odio id metus scelerisque, ut auctor magna fermentum.
              </p>
              <a
                href="#"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                Read more...
              </a>
            </div>
          </div>
          {/* End of blog post cards */}
        </div>
      </div>
    </>
  );
};

export default Home;