import { Game, SEO } from "@components";
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
import ListNFT from "@components/ListNft/ListNft";
import { alchemy } from "@config/AlchemyConfig";
import { useState, useEffect, useRef, useCallback } from "react";
import Profile from "@components/Profile/Profile";

const Home: NextPage = () => {
  useWeb3Portal();

  const [activeLink, setActiveLink] = useState<string>("profile");

  const { t } = useTranslation("footer");
  return (
    <>
      <Layout>
        <Header activeLink={activeLink} />
        <SEO />
        <Profile />
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
