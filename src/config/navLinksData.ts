export type navLinkType = {
  id: string;
  name: string;
  url: string;
  element: string;
};

const navLinksData: Array<navLinkType> = [
  {
    id: "0",
    name: "Profile",
    url: "/profile",
    element: "profile",
  },
  {
    id: "1",
    name: "List NFT",
    url: "/List",
    element: "list_nft",
  },
  {
    id: "2",
    name: "Games",
    url: "/Games",
    element: "games",
  },
];

export default navLinksData;
