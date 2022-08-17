import { SEO } from "@components";
import Layout from "@layout/Layout";
import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Header from "@components/Header/Header";
import { useWeb3Portal, walletActive } from "src/utils/Web3Portal";
import Navigator from "@components/Navigator/Navigator";

const Home: NextPage = () => {
  useWeb3Portal();

  const { t } = useTranslation("footer");
  return (
    <>
      <Layout>
        <Header />
        <SEO />
        {walletActive ? (
          <Navigator />
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
