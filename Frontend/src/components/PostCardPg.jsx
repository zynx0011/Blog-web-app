import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Button } from "../components/index";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";

const PostCardPg = () => {
  const params = useParams();
  //   const { id } = params.id;
  //   console.log(params);
  const [post, setPost] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const data = currentUser?.data?.data?.user;
  const data2 = currentUser?.user;

  const navigate = useNavigate();
  //   console.log(data);
  //   console.log(currentUser);
  //   console.log(isAuthor);
  //   console.log(post?.userRef);
  // console.log(post?.content);

  useEffect(() => {
    // if (currentUser?._id || data?._id === post?.userRef) {
    //   setIsAuthor(true);
    // } else {
    //   setIsAuthor(false);
    // }
    const posts = async (e) => {
      try {
        const res = await axios.get(`/api/v1/listing/get/${params.id}`);
        // console.log(res);
        setPost(res.data.data);
      } catch (error) {
        console.log(error, "error in postcardpg");
      }
    };

    posts();
  }, []);

  const deletePost = async () => {
    try {
      const res = await axios.delete(`/api/v1/listing/delete/${params.id}`);
      navigate("/");
    } catch (error) {
      console.log(error, "error in delete post");
    }
  };

  return post ? (
    <div className="py-8 text-white">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 ">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="rounded-xl"
          />

          {currentUser?._id ||
            data?._id === post?.userRef ||
            (data2?._id === post?.userRef && (
              <div className="absolute  right-[3%] top-6">
                <Link to={`/edit-post/${post._id}`}>
                  <Button
                    bgColor="bg-green-500"
                    className="mr-3 font-bold hover:text-black"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500"
                  className="font-bold hover:text-black "
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-8">
          <div className="w-full mb-6">
            <h1 className="text-4xl mt-5 font-bold text-center">
              {post.title}
            </h1>
          </div>
          <div className="browser-css text-xl ">
            <span className="font-bold text-xl">Description : </span>
            {post.description}
          </div>
          <div className="browser-css  ">
            <span className="font-bold text-xl">Content : </span>
            {post.content}
          </div>
        </div>
      </Container>
    </div>
  ) : (
    // (
    //   <Link to={"/addpost"}>
    //     <Button>Add Post</Button>
    //   </Link>
    // );
    <>
      <div className="flex flex-col space-y-3 items-center justify-center p-14">
        <Skeleton className="h-[225px] w-[80%] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </>
  );
};

export default PostCardPg;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../../appwrite/config";
// import { Button, Container } from "../index";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";

// export default function Post() {
//   const [post, setPost] = useState(null);
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const userData = useSelector((state) => state.auth.userData);

//   const isAuthor = post && userData ? post.userId === userData.$id : false;

//   useEffect(() => {
//     if (slug) {
//       appwriteService.getPost(slug).then((post) => {
//         if (post) setPost(post);
//         else navigate("/");
//       });
//     } else navigate("/");
//   }, [slug, navigate]);

//   const deletePost = () => {
//     appwriteService.deletePost(post.$id).then((status) => {
//       if (status) {
//         appwriteService.deleteFile(post.featuredImage);
//         navigate("/");
//       }
//     });
//   };

//   return post ? (
//     <div className="py-8">
//       <Container>
//         <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
//           <img
//             src={appwriteService.getFilePreview(post.featuredImage)}
//             alt={post.title}
//             className="rounded-xl"
//           />

//           {isAuthor && (
//             <div className="absolute  right-[3%] top-6">
//               <Link to={`/edit-post/${post.$id}`}>
//                 <Button
//                   bgColor="bg-green-500"
//                   className="mr-3 font-bold hover:text-black"
//                 >
//                   Edit
//                 </Button>
//               </Link>
//               <Button
//                 bgColor="bg-red-500"
//                 className="font-bold hover:text-black "
//                 onClick={deletePost}
//               >
//                 Delete
//               </Button>
//             </div>
//           )}
//         </div>
//         <div className="w-full mb-6">
//           <h1 className="text-2xl font-bold">{post.title}</h1>
//         </div>
//         <div className="browser-css">{parse(post.content)}</div>
//       </Container>
//     </div>
//   ) : (
//     // (
//     //   <Link to={"/addpost"}>
//     //     <Button>Add Post</Button>
//     //   </Link>
//     // );
//     <h1>No posts</h1>
//   );
// }
