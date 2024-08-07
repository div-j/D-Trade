import React from "react";
import { Helmet } from "react-helmet";

const HelmetWrapper = ({ title, description, keywords, author }) => {
  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <title>{title ? `${title} | d-trade` : "d-trade"}</title>
    </Helmet>
  );
};

HelmetWrapper.defaultProps = {
  title: "d-trade",
  description: "Your go-to marketplace for electronics and electrical products.",
  keywords: "electronics, electrical products, gadgets, e-commerce",
  author: "d-trade",
};

export default HelmetWrapper;
