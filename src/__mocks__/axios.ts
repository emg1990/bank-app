import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosResponse: AxiosResponse = {
  data: { falseProp: 'value' },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {} as InternalAxiosRequestConfig,
};

export default {
  create: jest.fn((config) => {
     const wrapFunction = (param: any) => {
      return Promise.resolve(axiosResponse)
     }

     return wrapFunction
  }),
  get: jest.fn((url) => {
    return Promise.resolve(axiosResponse)
  }),
  post: jest.fn((url) => {
    return Promise.resolve(axiosResponse)
  }),
  put: jest.fn((url) => {
    return Promise.resolve(axiosResponse)
  }),
  patch: jest.fn((url) => {
    return Promise.resolve(axiosResponse)
  }),
  isAxiosError: () => true,
};