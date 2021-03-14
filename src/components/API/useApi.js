import { useState } from "react";
import axios from "axios";
import useDebouncePromise from "./useDebouncePromise";

const initialRequestInfo = {
  error: null,
  data: null,
  loading: false,
};

export default function useApi(config) {
  const [requestInfo, setRequestInfo] = useState(initialRequestInfo);

  const debounceAxios = useDebouncePromise(axios, config.debounceDelay);

  async function call(localConfig) {
    let response = null;

    const finalConfig = {
      baseURL: "http://localhost:3004",
      ...config,
      ...localConfig,
    };
console.log(finalConfig.quiety);
    if (!finalConfig.quiety) {
      setRequestInfo({
        ...initialRequestInfo,
        loading: true,
      });
    }

    const fn = finalConfig.debounced ? debounceAxios : axios;

    try {
      response = await fn(finalConfig);

      setRequestInfo({
        ...initialRequestInfo,
        data: response.data,
      });
    } catch (error) {
      setRequestInfo({
        ...initialRequestInfo,
        error,
      });
    }

    if (config.onCompleted) {
      config.onCompleted(response);
    }
  }

  return [call, requestInfo];
}
