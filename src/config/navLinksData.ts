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
    url: "#profile",
    element: "profile",
  },
  {
    id: "1",
    name: "List NFT",
    url: "#list_nft",
    element: "list_nft",
  },
  {
    id: "2",
    name: "Games",
    url: "#games",
    element: "games",
  },
];

export default navLinksData;
