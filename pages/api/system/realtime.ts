import { NextApiRequest, NextApiResponse } from "next";
import { APIResponse } from "../../../types/api";
import { Activity } from "../../../types/activity";
import { Category } from "../../../types/category";
import { Topic } from "../../../types/topic";
import { User, SocialUser } from "../../../types/user";
import { Operation } from "../../../types/operation";
import { BookType, Book } from "../../../types/book";
import { getMockActivity } from "../mockdata/activity";
import { getMockCategory } from "../mockdata/category";
import { getMockElectronicBook } from "../mockdata/electronic-book";
import { getMockTopic } from "../mockdata/topic";
import { getMockSocialUser } from "../mockdata/user";
import { getMockReview } from "../mockdata/review";
import { Review } from "../../../types/review";
import { getMockOperation } from "../mockdata/operation";
import { getMockCommunityFocus } from "../mockdata/community";
import { CommunityFocus } from "../../../types/community";

export interface RealtimeJSON {
  activities: Array<Activity>,
  categories: Array<Category>,
  sections: Array<Category>,
  recommendations: {
    guessing: Category,
    sametaste: Category
  },
  community: {
    topParticipants: Array<Operation>,
    hotTopics: Array<Topic>,
    hotReviews: Array<Review>
    focus: Array<CommunityFocus>
  }
}

export default function (request: NextApiRequest, response: NextApiResponse) {
  let json: APIResponse<RealtimeJSON> = {
    code: 200,
    message: 'success',
    data: {
      activities: new Array(6).fill(0).map(() => getMockActivity()),
      categories: new Array(3).fill(0).map(() => getMockCategory()),
      sections: new Array(3).fill(0).map(() => getMockCategory()),
      recommendations: {
        guessing: getMockCategory(),
        sametaste: getMockCategory(),
      },
      community: {
        topParticipants: new Array(10).fill(0).map(() => getMockOperation()),
        hotTopics: new Array(10).fill(0).map(() => getMockTopic()),
        hotReviews: new Array(10).fill(0).map(() => getMockReview()),
        focus: new Array(3).fill(0).map(() => getMockCommunityFocus()),
      }
    }
  }
  response.status(200).json(json);
}