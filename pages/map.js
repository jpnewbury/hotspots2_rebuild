import React from "react";
import { useSWRInfinite } from "swr";
import { useUser } from "@/hooks/index";
import fetcher from "@/lib/fetch";
import GoogleMapReact from "google-map-react";
import { useCurrentUser } from "@/hooks/index";
function Post({ post }) {
  const user = useUser(post.creatorId);
  const Lat = localStorage.getItem("Latitude");
  const Lon = localStorage.getItem("Longitude");

  return (
    <>
      {user && (
        <div className="container">
          {Lat} {Lon}
        </div>
      )}
    </>
  );
}

export function usePostPages({ creatorId } = {}) {
  return useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData && previousPageData.posts.length === 0) return null;

      // first page, previousPageData is null
      if (index === 0) {
        return `/api/posts?limit=${PAGE_SIZE}${
          creatorId ? `&by=${creatorId}` : ""
        }`;
      }

      // using oldest posts createdAt date as cursor
      // We want to fetch posts which has a datethat is
      // before (hence the .getTime() - 1) the last post's createdAt
      const from = new Date(
        new Date(
          previousPageData.posts[previousPageData.posts.length - 1].createdAt
        ).getTime() - 1
      ).toJSON();

      return `/api/posts?from=${from}&limit=${PAGE_SIZE}${
        creatorId ? `&by=${creatorId}` : ""
      }`;
    },
    fetcher,
    {
      refreshInterval: 10000, // Refresh every 10 seconds
    }
  );
}

export default function Posts({ creatorId }) {
  const { data, error, size, setSize } = usePostPages({ creatorId });

  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0].posts?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.posts.length < PAGE_SIZE);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
      {!isReachingEnd && (
        <button
          type="button"
          style={{
            background: "transparent",
            color: "#000",
          }}
          onClick={() => setSize(size + 1)}
          disabled={isReachingEnd || isLoadingMore}
        >
          {isLoadingMore ? ". . ." : "load more"}
        </button>
      )}
    </div>
  );
}
