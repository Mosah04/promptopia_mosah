"use client";

import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const { id: userId } = useParams();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    console.log("user", session?.user);
    console.log(session);
    if (session?.user.id) fetchPosts();
  }, []);

  console.log("userId", userId);
  return (
    <Profile
      name={userName[0].toUpperCase() + userName.slice(1).toLowerCase()}
      desc={`Welcome to your ${userName} profile page. Explore ${userName} exceptional prompts and be inspired by the power of their imagination.`}
      data={posts}
    />
  );
};

export default MyProfile;
