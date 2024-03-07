import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { MailIcon } from "@heroicons/react/outline";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Profile = () => {
  // const [userInfo, setUserInfo] = useState({
  //   username: "JohnDoe",
  //   email: "johndoe@example.com",
  //   bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
  // });

  const [userInfo, setUserInfo] = useState({});
  const params = useParams();
  console.log(userInfo);
  const [bio, setBio] =
    useState(` Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Integer nec odio. Praesent libero. Sed cursus ante dapibus
  diam.`);

  useEffect(() => {
    const userInfo = async () => {
      try {
        const res = await axios.get(`/api/v1/users/current-user/${params.id}`);
        console.log(res.data);
        setUserInfo(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    userInfo();
  }, [params.id === userInfo._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send updated user info to backend or perform necessary actions
    try {
      const res = await axios.put(`/api/v1/users/update/${params.id}`, {
        ...userInfo,
      });
      // console.log(res.data.data);
      setUserInfo(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12">
      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 bg-indigo-500">
              <h3 className="text-lg font-medium leading-6 text-white">
                Profile Information
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-indigo-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-semibold text-indigo-500 ">
                    Username
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-900 sm:col-span-2">
                    {userInfo?.username}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-semibold text-indigo-500">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 font-semibold sm:col-span-2">
                    {userInfo?.email}
                  </dd>
                </div>
                <div className="bg-indigo-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-semibold text-indigo-500">Bio</dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-900 sm:col-span-2">
                    {bio}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-semibold text-indigo-500">
                    Edit
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <Sheet>
                        <SheetTrigger asChild>
                          <button variant="outline">Edit profile</button>
                        </SheetTrigger>
                        <SheetContent className="bg-black text-white">
                          <SheetHeader>
                            <SheetTitle className="font-bold text-white">
                              Edit profile
                            </SheetTitle>
                            <SheetDescription>
                              Make changes to your profile here. Click save when
                              you're done.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label className="text-right font-semibold">
                                Username
                              </label>
                              <input
                                id="name"
                                value={userInfo?.username}
                                onChange={(e) => {
                                  setUserInfo({
                                    ...userInfo,
                                    username: e.target.value,
                                  });
                                }}
                                className="col-span-3 border-4 text-black"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label className="text-left font-semibold">
                                Email
                              </label>
                              <input
                                id="username"
                                value={userInfo?.email}
                                onChange={(e) => {
                                  setUserInfo({
                                    ...userInfo,
                                    email: e.target.value,
                                  });
                                }}
                                className="col-span-3 border-4 text-black"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-left font-semibold">
                              Bio
                            </label>
                            <textarea
                              id="username"
                              value={bio}
                              onChange={(e) => {
                                setBio(e.target.value);
                              }}
                              className="col-span-3 border-4 text-black h-40 "
                            />
                          </div>
                          <SheetFooter>
                            <SheetClose asChild>
                              <div className="mt-10 flex flex-col gap-5">
                                <button
                                  onClick={handleSubmit}
                                  className="p-2 bg-green-600 text-white rounded-lg"
                                >
                                  Save changes
                                </button>
                                <Link
                                  to="/change-password"
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Change password ?
                                </Link>
                              </div>
                            </SheetClose>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    </button>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
