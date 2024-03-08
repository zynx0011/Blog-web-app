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
        // console.log(res.data);
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
    <div className="">
      <div className=" mx-auto ">
        <div className=" overflow-hidden shadow ">
          <div className="border-t border-gray-200">
            <dl>
              <div className="sm:flex items-center sm:gap-[12%] sm:p-9">
                <div className="border-r-2 sm:min-h-screen sm:px-9 ">
                  <h1 className="text-4xl font-bold text-white p-4 mr-5">
                    Profile
                  </h1>
                  {/* <button className="text-indigo-600 hover:text-indigo-900">asdf</button> */}
                </div>
                <div className="border-2 sm:p-7 sm:min-h-[70vh] flex items-center ">
                  <div className="text-white text-xl p-4 flex gap-10  flex-col">
                    <h1 className=" m-3 ">
                      Username :{" "}
                      <span className="font-bold ">{userInfo?.username}</span>
                    </h1>
                    <hr className="mb-3" />
                    <h1 className=" m-3">
                      {" "}
                      Email :{" "}
                      <span className="font-bold ">{userInfo?.email}</span>
                    </h1>
                    <hr />
                    <h1 className=" m-3">
                      {" "}
                      Bio :<span className="font-bold ">{bio}</span>
                    </h1>
                    <hr />
                    <button className="p-3 bg-blue-700 font-semibold text-white rounded-lg hover:bg-blue-600">
                      {" "}
                      <Sheet>
                        <SheetTrigger asChild>
                          <button variant="outline" className=" w-full">
                            Edit profile
                          </button>
                        </SheetTrigger>
                        <SheetContent className="bg-[#10172a] text-white">
                          <SheetHeader>
                            <SheetTitle className="font-bold text-white text-xl ">
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
                  </div>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

    //     <div className="flex items-center gap-[12%] p-9">
    //       <div className="border-r-2 min-h-screen px-9 ">
    //         <h1 className="text-4xl font-bold text-white p-4 mr-5">Profile</h1>
    //         {/* <button className="text-indigo-600 hover:text-indigo-900">asdf</button> */}
    //       </div>
    //       <div className="border-2 p-5 min-h-[70vh] flex items-center ">
    //         <div className="text-white text-xl p-4 flex gap-10 flex-col">
    //           <h1 className="border-b-2 m-3 ">
    //             Username : <span className="font-bold ">{userInfo?.username}</span>
    //           </h1>
    //           <h1 className="border-b-2 m-3">
    //             {" "}
    //             Email : <span className="font-bold ">{userInfo?.email}</span>
    //           </h1>
    //           <h1 className="border-b-2 m-3">
    //             {" "}
    //             Bio :<span className="font-bold ">{bio}</span>
    //           </h1>
    //           <h1 className="border-b-2 m-3">Edit profile :</h1>
    //         </div>
    //       </div>
    //     </div>
  );
};

export default Profile;
