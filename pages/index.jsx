import React from "react";
import Image from "next/image";

import { useCurrentUser } from "@/hooks/index";
import PostEditor from "@/components/post/editor";
import Posts from "@/components/post/posts";
import Geo from "../components/geolocation";

const IndexPage = () => {
  const [user] = useCurrentUser();

  return (
    <div>
      <div>
        <div>
          {user ? (
            <>
              <Geo />
              <PostEditor />
              <Posts />
            </>
          ) : (
            <>
              <div className="middle">
                <Image
                  src="/rfconservancy.png"
                  height={200}
                  width={200}
                  alt="Roaring Fork Conservancy"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
