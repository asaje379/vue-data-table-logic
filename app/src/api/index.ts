import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:9870',
});

const token =
  'bec8aa6ae23f936fbb73b4448a20046a0dd577df9f976b3220035cd7c048dcb9340764b19d6b6949d215d1d986f77ed4da75a98bb10b4b86f240a2c3f49b6782.e8d3e0f59773ad8b5ff1f70cf2b35ccf.682d05405c62f63428c736f82fe84375d09d07c689947f5eeef983bfec373263';
api.defaults.headers.common.Authorization = `Bearer ${token}`;
