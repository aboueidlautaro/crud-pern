import React, { useState } from "react";
import { useEffect } from "react";
import "../services/config";
import Articles from "./Articles";

function FetchArticles({ status }) {
  const fetchConfig = global.config.all_articles.url;
  const urlFetchAllArticles = fetchConfig;

  const search = "";
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("null");

  const results = articles;

  useEffect(() => {
    fetch(urlFetchAllArticles)
      .then((response) => response.json())
      .then((response) => {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
        setArticles(response.allArticles);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }, [urlFetchAllArticles]);

  return (
    <>
      <Articles status={status} results={results} loading={loading} />
    </>
  );
}
export default FetchArticles;
