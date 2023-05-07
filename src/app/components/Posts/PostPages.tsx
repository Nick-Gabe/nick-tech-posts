import { PostCard } from "../PostCard/PostCard";
import { PostPagesProps } from "./postsTypes";
import { Post } from "@components/PostCard/postCardTypes";
import { Pagination } from "antd";
import { useState } from "react";


export const PostPages = (props: PostPagesProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <div className='grid gap-10 mb-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-10 max-w-[90vw] lg:max-w-[1600px]'>
        {props.posts.sort(sortByDate).slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map((post) => (
          <PostCard key={post.id} post={post} search={props.search} />
        ))}
      </div>
      <Pagination
        current={currentPage}
        pageSize={postsPerPage}
        total={props.posts.length}
        onChange={setCurrentPage}
        hideOnSinglePage
        className="mt-4 mb-2"
      />
    </>
  )
}
