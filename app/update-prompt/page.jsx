"use client";

import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    const getPrompt = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);

      if (response.ok) {
        const data = await response.json();
        setPost(data);
      }
    };
    if (promptId) getPrompt();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();

    if (!promptId) return alert("Prompt ID not found.");

    setSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

const UpdatePage = () => {
  return (
    <Suspense>
      <EditPrompt />
    </Suspense>
  );
};

export default UpdatePage;
