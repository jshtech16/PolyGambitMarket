export const navCommonMenuList = [
  {
    image: "elections.svg",
    label: "Elections",
    link: "/elections",
  },
  {
    image: "activity.svg",
    label: "Activity",
    link: "/activity",
  },
  {
    image: "ranks.svg",
    label: "Ranks",
    link: "/leaderboard",
  },
  {
    image: "ai.svg",
    label: "AI",
    link: "/ai",
  },
];

export const navMarketsList = [
  {
    label: "Browse",
    view: {
      show: true,
      label: "View all",
      link: "/markets",
    },
    child: [
      {
        image: "market-new.svg",
        label: "New",
        link: "/markets?sort=startDate:desc",
      },
      {
        image: "market-trending.svg",
        label: "Trending",
        link: "/markets?sort=trending:desc",
      },
      {
        image: "market-liquid.svg",
        label: "Liquid",
        link: "/markets?sort=liquidity:desc",
      },
      {
        image: "market-ending.svg",
        label: "Ending Soon",
        link: "/markets?sort=endDate:desc",
      },
    ],
  },
  {
    label: "Topics",
    view: {
      show: false,
      label: "View all",
      link: "/",
    },
    child: [
      {
        image: "middle-east.png",
        label: "Middle East",
        link: "/markets?sort=startDate:desc",
      },
      {
        image: "politics.png",
        label: "Politics",
        link: "/markets?sort=trending:desc",
      },
      {
        image: "crypto.png",
        label: "Crypto",
        link: "/markets?sort=liquidity:desc",
      },
      {
        image: "sports.png",
        label: "Sports",
        link: "/markets?sort=endDate:desc",
      },
      {
        image: "pop culture.png",
        label: "Pop Culture",
        link: "/markets?sort=liquidity:desc",
      },
      {
        image: "science.png",
        label: "Science",
        link: "/markets?sort=endDate:desc",
      },
    ],
  },
];

export const navDropdownMenuList = [
  {
    label: "Profile",
    link: "profile",
    loginUser: true,
  },
  {
    label: "Settings",
    link: "settings",
    loginUser: true,
  },
  {
    label: "Activity",
    link: "activity",
    loginUser: false,
  },
  {
    label: "WatchList",
    link: "watchlist",
    loginUser: false,
  },
  {
    label: "Leaderboard",
    link: "leaderboard",
    loginUser: false,
  },
  {
    label: "Learn",
    link: "learn",
    loginUser: false,
  },
];
