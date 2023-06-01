import axios from "axios";
import { useEffect, useState } from "react";

type RequestType = "GET" | "POST" | "PATCH" | "DELETE";

const useFetch = <T>(
  url: string,
  defaultValue: T,
  requestType: RequestType = "GET",
  body?: object | undefined
): [T, Error | undefined, boolean] => {
  const [data, setData] = useState<T>(defaultValue);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        switch (requestType) {
          case "GET":
            setData((await axios.get(url)).data);
            break;
          case "POST":
            setData((await axios.post(url, body)).data);
            break;
          case "PATCH":
            setData((await axios.patch(url, body)).data);
            break;
          case "DELETE":
            setData((await axios.delete(url)).data);
            break;
          default:
            break;
        }
        setLoading(false);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
      }
    };
    fetchData();
  }, [url, requestType, body]);
  return [data, error, loading];
};

export default useFetch;
