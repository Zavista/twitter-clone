import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { POSTS } from "../../utils/db/dummy";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type PostsProps = {
  feedType?: string;
  username?: string;
  userId?: string;
};

const Posts = ({ feedType, username, userId }: PostsProps) => {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        let res;
        let data;

        switch (feedType) {
          case "for you":
            res = await fetch("/api/post/all");
            data = await res.json();
            break;
          case "following":
            res = await fetch("/api/post/following");
            data = await res.json();
            break;
          case "posts":
            res = await fetch(`/api/post/user/${username}`);
            data = await res.json();
            break;

          case "likes":
            res = await fetch(`/api/post/likes/${userId}`);
            data = await res.json();
            break;
          default:
            res = await fetch("/api/post/all");
            data = await res.json();
            break;
        }

        return data;

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [feedType, refetch]);

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && !isRefetching && data?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!isLoading && !isRefetching && data && (
        <div>
          {data.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
export default Posts;
