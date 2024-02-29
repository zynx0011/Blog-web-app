import React, { useEffect, useState } from "react";
import { Button, Container, Input, RTE, Select } from "../index";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../../Firebase";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const { control } = useForm();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const data = currentUser?.data?.data?.user;
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    slug: "",
    content: "",
    featuredImage: "",
    status: true,
  });

  console.log(formdata);
  const [image, setImage] = useState(undefined);
  const [imageError, setImageError] = useState(false);
  const [imageSuccess, setImageSuccess] = useState(false);

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
    try {
      const res = await axios.post("/api/v1/listing/create", {
        ...formdata,
        userRef: currentUser?._id || data?._id,
      });
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-8">
      <Container>
        <form onSubmit={handleSubmit} className="flex flex-wrap">
          <div className="w-2/3 px-2">
            <Input
              label="Title :"
              placeholder="Title"
              className="mb-4"
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
              className="mb-4"
              type="text"
              id="description"
              onChange={(e) => {
                setFormdata({ ...formdata, description: e.target.value });
              }}
              value={formdata.description}
            />
            <Input
              label="Slug :"
              placeholder="Slug"
              className="mb-4"
              type="text"
              id="slug"
              value={formdata.slug}
              onChange={(e) => {
                setFormdata({ ...formdata, slug: e.target.value });
              }}
              // onInput={(e) => {
              //   setValue("slug", slugTransform(e.currentTarget.value), {
              //     shouldValidate: true,
              //   });
              // }}
            />
            <RTE
              label="Content :"
              name="content"
              type="text"
              onChange={(e) => {
                setFormdata({ ...formdata, content: e.target.value });
              }}
              id="content"
              control={control}
            />
          </div>
          <div className="w-1/3 px-2">
            {imageSuccess ? (
              <p className="text-green-700">Image uploaded successfully</p>
            ) : (
              <p className="text-blue-700">Image is uploading please wait </p>
            )}
            <Input
              label="Featured Image :"
              type="file"
              id="featuredImage"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {/* {post && (
              <div className="w-full mb-4">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg"
                />
              </div>
            )} */}
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
              className="w-full"
            >
              {/* {post ? "Update" : "Submit"} */}
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default AddPost;
