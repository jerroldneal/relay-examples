import * as React from "react";
import Story from "./Story";
import { graphql } from 'relay-runtime';
import { useLazyLoadQuery } from "react-relay";
import type { NewsfeedQuery as NewsfeedQueryType } from './__generated__/NewsfeedQuery.graphql';
const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    topStory {
      ...StoryFragment
      title
      summary
      createdAt
      poster {
        name
        profilePicture {
          url
        }
      }
      thumbnail {
        url
      }
    }
  }
`;

export default function Newsfeed() {
  const storyOld = {
    title: "Placeholder Story",
    summary: "Placeholder data, to be replaced with data fetched via GraphQL",
    poster: {
      name: "Placeholder Person",
      profilePicture: {
        url: "/assets/cat_avatar.png",
      },
    },
    thumbnail: {
      url: "/assets/placeholder.jpeg",
    },
  };
  const data = useLazyLoadQuery<NewsfeedQueryType>(
    NewsfeedQuery,
    {},
  );
  const story = data.topStory;
  return (
    <div className="newsfeed">
      <Story story={story} />
    </div>
  );
}
