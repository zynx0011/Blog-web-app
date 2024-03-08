"use client";
import React, { useEffect, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Button, Container, Input, Select } from "../index";
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
import { useParams } from "react-router-dom";
import { Alert } from "@mui/material";

function AddPost() {
  const toast = useToast();
  const { control } = useForm();
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

  // console.log(formdata);
  const [image, setImage] = useState(undefined);
  const [imageError, setImageError] = useState(false);
  const [imageSuccess, setImageSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // const [errorText, setErrorText] = useState(false);

  const params = useParams();

  // useEffect(() => {
  //   if (errorText) {
  //     // Call toast function when errorText changes to true
  //     toast({
  //       variant: "destructive",
  //       title: "Please check your credentials.",
  //       description: "There was a problem with your request.",
  //     });
  //   }
  // }, [errorText]);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.slug;
      const res = await axios.get(`/api/v1/listing/get/${listingId}`);
      // console.log(res.data.data);
      setFormdata(res.data.data);
    };
    //   const listingId = params.listingId;
    //   const res = await fetch(`/api/v1/listing/get/${listingId}`);
    //   const data = await res.json();
    //   if (data.success === false) {
    //     console.log(data.message);
    //     return;
    //   }
    //   setFormData(data);
    // };

    fetchListing();
  }, []);

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
      // setErrorText(false);
      const res = await axios.post(`/api/v1/listing/update/${params.slug}`, {
        ...formdata,
        userRef: currentUser?._id || data?._id,
      });
      // console.log(res);
      // setErrorText(false);
      setUpdateSuccess(true);
    } catch (error) {
      // setErrorText(true);
      setUpdateSuccess(false);
      console.log(error);
    }
  };

  // console.log(updateSuccess);

  const handleRemoveImage = () => {
    setFormdata({ ...formdata, featuredImage: "" });
  };
  return (
    <div className="py-8 text-white">
      <Container>
        <h1 className="text-4xl font-bold text-center mb-16 text-white">
          Edit Your Blog
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap flex-col sm:flex-row"
        >
          <div className="sm:w-2/3 px-2">
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
            <label>Content :</label>
            <textarea
              label="Content :"
              name="content"
              placeholder="Content"
              className="mb-4 w-full p-3 text-black"
              rows={10}
              value={formdata.content}
              onChange={(e) => {
                setFormdata({ ...formdata, content: e.target.value });
              }}
            ></textarea>
          </div>
          {/* {errorText ? (
            <div>
              <ToastAction description="There was a problem with your request." />
            </div>
          ) : (
            <div>
              <ToastAction description="There was a problem with your request." />
            </div>
          )} */}
          {updateSuccess && (
            <Alert
              variant="filled"
              severity="success"
              className="absolute right-3 top-[16%] "
              sx={{ width: "20%" }}
            >
              Successfully Updated Information
            </Alert>
          )}
          <div className="sm:w-1/3 px-2">
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
            {formdata?.featuredImage?.length > 0 && (
              // {/* // formdata?.featuredImage.map((url, index) => ( */}
              <div className="flex justify-between p-3 border items-center">
                <img
                  src={formdata.featuredImage}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            )}
            {/* ))} */}
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
              Update
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default AddPost;
