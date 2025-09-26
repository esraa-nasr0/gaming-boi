export interface Screenshot {
  id: number;
  image: string;
}

export interface Game {
  id: number;
  name: string;
  background_image?: string;
  released?: string;
  rating?: number;
  description_raw?: string; // <-- أضِف دي
  ratings_count?: number;
  metacritic?: number;
  genres?: Array<{
    id: number;
    name: string;
  }>;
  platforms?: Array<{
    platform: {
      id: number;
      name: string;
    };
  }>;
  // مضافة عشان GameCard بيستخدم parent_platforms + slug
  parent_platforms?: Array<{
    platform: {
      id: number;
      name: string;
      slug: string;
    };
  }>;
  short_screenshots?: Screenshot[];
}

// شكل العنصر الراجع من الهوك/الـ API لما يكون فيه data | id | screenshots
export interface GameApiResponse {
  data?: Game;
  id?: number;
  screenshots?: {
    results: Screenshot[];
  };
}
