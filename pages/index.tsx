import { SEO } from "@components";
import Layout from "@layout/Layout";
import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Home: NextPage = () => {
  const { t } = useTranslation("footer");
  return (
    <>
      <Layout>
        <SEO />
        <p>{t("common:welcome")}</p>
        <p>{t("about:name", { name: "Akim" })}</p>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(
        context?.locale === undefined ? "" : context.locale,
        ["common", "about"],
      )),
      // Will be passed to the page component as props
    },
  };
};

export default Home;
