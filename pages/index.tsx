import { SEO } from "@components";
import Layout from "@layout/Layout";
import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Header from "@components/Header/Header";
import {
  useWeb3Portal,
  walletAccount,
  walletActive,
} from "src/utils/Web3Portal";
import Navigator from "@components/Navigator/Navigator";
import ListNFT from "@components/ListNft/ListNft";
import { alchemy } from "@config/AlchemyConfig";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  useWeb3Portal();

  const [loadNFT, setLoadNFT] = useState(false);
  const [listNFT, setListNFT] = useState();
  const [nftCount, setNftCount] = useState(0);
  const [nfts, setNfts] = useState(0);

  useEffect(() => {
    if (walletAccount != null) {
      alchemy.nft
        .getNftsForOwner(String(walletAccount))
        .then((response: any) => {
          console.log(response);
          setNftCount(response.totalCount);
          setNfts(response.ownedNfts);

          setLoadNFT(true);
          setListNFT(response);
        })
        .catch((err) => console.error(err));
    }
  }, [walletAccount]);

  const { t } = useTranslation("footer");
  return (
    <>
      <Layout>
        <Header />
        <SEO />
        {walletActive ? (
          <div>
            <Navigator />
            <ListNFT count={nftCount} nfts={nfts} />
          </div>
        ) : (
          <div>
            <p>{t("common:welcome")}</p>
            <p> Please log in to access the app</p>
          </div>
        )}
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context?.locale === undefined ? "" : context.locale,
        ["common", "about"]
      )),
      // Will be passed to the page component as props
    },
  };
};

export default Home;
