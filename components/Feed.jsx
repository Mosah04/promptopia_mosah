"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useRouter } from "@node_modules/next/navigation";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data &&
        data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
    </div>
  );
};

const Feed = () => {
  const router = useRouter();

  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const isSearching = searchText.trim() !== "";

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt/`);
      const data = await response.json();

      setAllPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    router.refresh();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");

    return allPosts.filter(
      (post) =>
        regex.test(post?.creator?.username) ||
        regex.test(post?.tag) ||
        regex.test(post?.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
    }, 500);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {allPosts?.length > 0 ? (
        <PromptCardList
          data={isSearching ? searchedResults : allPosts}
          handleTagClick={handleTagClick}
        />
      ) : (
        <div className="desc text-center mt-16"> No prompt found</div>
      )}
    </section>
  );
};

export default Feed;
