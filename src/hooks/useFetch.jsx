import { useState } from "react";
import { fetchApi } from "./../services/api";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = (path, method = "GET", token, body) => {
    setLoading(true);
    fetchApi(path, method, token, body)
      .then((data) => {
        setLoading(false);
        setData(data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };
  return { loading, data, error, fetchData };
};

export default useFetch;
