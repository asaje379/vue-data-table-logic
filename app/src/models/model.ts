import { api } from '../api';

type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

type FetchArgs<Body> = {
  method: RequestMethod;
  url: string;
  body?: Body;
  params?: Record<string, string | number>;
};

export type Pagination = {
  page?: number;
  limit?: number;
  search?: string;
};

export class DataModel {
  entity: string = '';
  columns: Record<string, string> = {};

  async find(args?: Pagination) {
    return await this.fetch({
      method: 'get',
      url: this.entity,
      ...(args ? { params: args } : {}),
    });
  }

  async fetch<T>(args: FetchArgs<T>) {
    try {
      const body: any[] = ['post', 'put', 'patch'].includes(args.method)
        ? [args.body]
        : [];
      const response = await api[args.method](args.url, ...body, {
        params: args.params,
      });
      return { failed: false, data: response.data };
    } catch (error: any) {
      return { failed: true, error: error.message };
    }
  }
}
