import React, { useEffect, useState } from "react";
import { Button, Container, Input, Select } from "../index";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../../Firebase";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useToast } from "@/components/ui/use-toast";

function AddPost() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useSelector((state) => state.auth);
  const data = currentUser?.data?.data?.user;
  const data2 = currentUser?.user;
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    slug: "",
    content: "",
    featuredImage: "",
    status: true,
  });

  // console.log(formdata);
  const [image, setImage] = useState(undefined);
  const [imageError, setImageError] = useState(false);
  const [imageSuccess, setImageSuccess] = useState(false);
  const [Error, setError] = useState(false);

  useEffect(() => {
    if (image) {
      HandleFileUpload(image);
    }
  }, [image]);

  const HandleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) =>
            setFormdata({ ...formdata, featuredImage: downloadURL }),
          setImageSuccess(true)
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const res = await axios.post(`/api/v1/listing/create`, {
        ...formdata,
        userRef: currentUser?._id || data?._id || data2?._id,
      });
      setError(false);
      // console.log(res);
      navigate("/");
    } catch (error) {
      setError(true, "error");
      console.log(error);
    }
  };

  return (
    // <div className="py-8">
    //   <Container>
    //     <form
    //       onSubmit={handleSubmit}
    //       className="flex items-center flex-wrap flex-col "
    //     >
    //       <div className="sm:w-2/3 sm:px-2">
    //         <Input
    //           label="Title :"
    //           placeholder="Title"
    //           className="mb-4"
    //           type="text"
    //           id="title"
    //           onChange={(e) => {
    //             setFormdata({ ...formdata, title: e.target.value });
    //           }}
    //           value={formdata.title}
    //         />
    //         <Input
    //           label="Description :"
    //           placeholder="Description"
    //           className="mb-4"
    //           type="text"
    //           id="description"
    //           onChange={(e) => {
    //             setFormdata({ ...formdata, description: e.target.value });
    //           }}
    //           value={formdata.description}
    //         />
    //         <label>Content :</label>
    //         <textarea
    //           label="Content :"
    //           name="content"
    //           placeholder="Content"
    //           className="mb-4 w-full p-3"
    //           rows={10}
    //           value={formdata.content}
    //           onChange={(e) => {
    //             setFormdata({ ...formdata, content: e.target.value });
    //           }}
    //         ></textarea>
    //       </div>
    //       <div className="px-4 sm:w-2/3 sm:px-2">
    //         {imageSuccess ? (
    //           <p className="text-green-700 text-center">
    //             Image uploaded successfully
    //           </p>
    //         ) : (
    //           <p className="text-blue-700 text-center">
    //             Image is uploading please wait{" "}
    //           </p>
    //         )}
    //         <Input
    //           label="Featured Image :"
    //           type="file"
    //           id="featuredImage"
    //           className="mb-4"
    //           accept="image/png, image/jpg, image/jpeg, image/gif"
    //           onChange={(e) => setImage(e.target.files[0])}
    //         />
    //         {/* {post && (
    //           <div className="w-full mb-4">
    //             <img
    //               src={appwriteService.getFilePreview(post.featuredImage)}
    //               alt={post.title}
    //               className="rounded-lg"
    //             />
    //           </div>
    //         )} */}
    //         <Select
    //           options={["active", "inactive"]}
    //           label="Status"
    //           className="mb-4"
    //           id="status"
    //           onChange={(e) => {
    //             setFormdata({ ...formdata, status: e.target.value });
    //           }}
    //           type="boolean"
    //         />
    //         <Button
    //           type="submit"
    //           // bgColor={post ? "bg-green-500" : undefined}
    //           className="w-full"
    //         >
    //           {/* {post ? "Update" : "Submit"} */}
    //           Submit
    //         </Button>
    //       </div>
    //     </form>
    //   </Container>
    // </div>

    <div className="py-8 text-white">
      <Container>
        <h1 className="text-4xl font-bold text-center mb-12 text-white">
          Post Your Blog
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap flex-col sm:flex-row "
        >
          <div className="sm:w-2/3 px-2  ">
            <Input
              label="Title :"
              placeholder="Title "
              className="mb-4 font-semibold "
              type="text"
              id="title"
              onChange={(e) => {
                setFormdata({ ...formdata, title: e.target.value });
              }}
              value={formdata.title}
            />
            <Input
              label="Description :"
              placeholder="Description"
              className="mb-4 font-semibold "
              type="text"
              id="description"
              onChange={(e) => {
                setFormdata({ ...formdata, description: e.target.value });
              }}
              value={formdata.description}
            />
            <label>Content :</label>
            <textarea
              label="Content :"
              name="content"
              placeholder="Content"
              className="mb-4 w-full p-3 text-black rounded-lg font-semibold"
              rows={10}
              value={formdata.content}
              onChange={(e) => {
                setFormdata({ ...formdata, content: e.target.value });
              }}
            ></textarea>
          </div>

          <div className="sm:w-1/3 px-2">
            {imageSuccess ? (
              <p className="text-green-700">Image uploaded successfully</p>
            ) : null}
            <Input
              label="Featured Image :"
              type="file"
              id="featuredImage"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <Select
              options={["active", "inactive"]}
              label="Status"
              className="mb-4"
              id="status"
              onChange={(e) => {
                setFormdata({ ...formdata, status: e.target.value });
              }}
              type="boolean"
            />
            <Button
              type="submit"
              // bgColor={post ? "bg-green-500" : undefined}
              // disabled={!imageSuccess}
              className="w-full hover:bg-blue-700 disabled:bg-gray-500"
            >
              {/* {post ? "Update" : "Submit"} */}
              Add Post
            </Button>
          </div>
          {Error ? (
            <Alert
              variant="filled"
              severity="error"
              className="absolute right-5 top-[16%] "
              sx={{ width: "25%" }}
            >
              Please check your credentials or wait image is uploading...
            </Alert>
          ) : null}
        </form>
      </Container>
    </div>
  );
}

export default AddPost;
