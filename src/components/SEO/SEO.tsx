import { get } from "lodash";
import metaTag from "@config/metaTag";
import Head from "next/head";

const SEO = ({ page = "" }) => {
  return (
    <Head>
      <title itemProp="name" lang="en">
        {get(metaTag, "title", "")}
      </title>
      <link rel="shortcut icon" href="/assets/favicons/favicon.ico" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="msapplication-TileColor" content="#060E19" />
      <meta
        name="msapplication-TileImage"
        content="/assets/icons/mstile-150x150.png"
      />
      <meta
        name="apple-mobile-web-app-title"
        content={get(metaTag, "title", "")}
      />
      <meta name="description" content={get(metaTag, "description", "")} />
      {/*<meta
        itemProp="image"
        content={`${process.env.NEXT_PUBLIC_SITE_URL}/screenshotSite.png`}
      />*/}
      <meta name="keywords" content={`${get(metaTag, "keywords", "")}`} />
      <meta itemProp="name" content={get(metaTag, "title", "")} />
      <meta name="theme-color" content="#060E19" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`${get(metaTag, "url", "")}${page}`} />
      <meta
        name="twitter:site"
        content={`${get(metaTag, "twitter_account", "")}`}
      />
      <meta
        name="twitter:creator"
        content={`${get(metaTag, "twitter_account", "")}`}
      />
      <meta name="twitter:title" content={get(metaTag, "title", "")} />
      <meta
        name="twitter:description"
        content={get(metaTag, "description", "")}
      />
      {/*<meta
        name="twitter:image"
        content={`${process.env.NEXT_PUBLIC_SITE_URL}/screenshotSite.png`}
      />
      <meta name="twitter:image:alt" content={get(metaTag, "title", "")} />*/}

      <meta
        property="og:description"
        content={get(metaTag, "description", "")}
      />
      {/*<meta property="og:image" content="/screenshotSite.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/png" />*/}
      <meta
        property="og:locale"
        content={`${get(metaTag, "language", "")}`}
        data-react-helmet="true"
      />
      <meta property="og:site_name" content={get(metaTag, "title", "")} />
      <meta property="og:type" content={`${get(metaTag, "type", "")}`} />
      <meta property="og:title" content={get(metaTag, "title", "")} />
      <meta property="og:url" content={`${get(metaTag, "url", "")}${page}`} />

      {/*<link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/icons/apple-touch-icon.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="48x48"
        href="/assets/icons/icon-48x48.png"
      />

      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/assets/icons/icon-48x48.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="96x96"
        href="/assets/icons/icon-96x96.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="128x128"
        href="/assets/icons/icon-128x128.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/assets/icons/icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/assets/icons/icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="192x192"
        href="/assets/icons/icon-192x192.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="384x384"
        href="/assets/icons/icon-384x384.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="512x512"
        href="/assets/icons/icon-512x512.png"
      />

      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/assets/icons/android-chrome-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="384x384"
        href="/assets/icons/icon-384x384.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/assets/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      />*/}
    </Head>
  );
};

export default SEO;
