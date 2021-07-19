import axios, { AxiosAdapter, AxiosInstance } from "axios";

type DataLayerConfig = {
  baseURL?: string;
  cacheAdapter?: AxiosAdapter;
};

const defaults = {
  dataLayerHost: "https://randomuser.me/api/",
};

const config = {
  maxRedirects: 0,
  headers: {
    "x-jw-token": "",
    "Content-Type": "application/json",
  },
};

let dataLayerApi: AxiosInstance;

const logRequestUrl = (url: string): void => {
  if (process.env.NODE_ENV !== "production") {
    console.info(`API-REQUEST: ${url}`);
  }
};

const logError = (description: string, error: string): void => {
  console.error(description, error);
};

export const setupDataLayerApi = (config?: DataLayerConfig): void => {
  let baseURL = config && config.baseURL;

  if (!baseURL) {
    baseURL = process.env.DATA_LAYER_HOST || defaults.dataLayerHost;
  }

  const axiosInstance = axios.create({
    baseURL,
    adapter: config && config.cacheAdapter,
  });

  axiosInstance.interceptors.request.use((config) => {
    logRequestUrl(`${config.baseURL} ${config.url}`);
    return config;
  });

  if (config && config.cacheAdapter) {
    axiosInstance.interceptors.response.use(function (response) {
      if (response.request.fromCache) {
        console.info(
          `Served from cache:, ${response.config.baseURL}, ${response.config.url}`
        );
      }

      return response;
    });
  }

  dataLayerApi = axiosInstance;
};

setupDataLayerApi();

export const getProfiles = (payload: {
  results?: number;
  gender?: boolean;
}): any => {
  const { results, gender } = payload;
  const url = "";

  return dataLayerApi
    .get(url, {
      ...config,
      params: { results, gender },
    })
    .then((result) => result.data)
    .catch((error) => {
      logError(url, error);
      return { error };
    });
};
