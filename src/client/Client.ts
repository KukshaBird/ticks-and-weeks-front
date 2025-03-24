import { BASE_URL } from '../services/constants.ts';

export type Payload = object | string[] | string | number | number[] | [];

interface ClientOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  data?: Payload;
}

export class Client {
  private readonly _url: string;
  private _options = {
    headers: { 'Content-Type': 'application/json' },
  };

  constructor(recurseUrl: string) {
    this._url = `${BASE_URL}/${this.trimSlashes(recurseUrl)}`;
  }

  public async madeRequest<ReturnType = unknown>(url?: string, options: ClientOptions = {}): Promise<ReturnType> {
    const cleanUrl = url ? `${this._url}/${this.trimSlashes(url)}` : this._url;
    const body: string | undefined = options.data ? JSON.stringify(options.data) : undefined;
    const response = await fetch(cleanUrl, { ...this._options, ...options, body: body });
    if (!response.ok) {
      throw new Error('request failed');
    }

    return (await response.json()) as ReturnType;
  }

  private trimSlashes(str: string): string {
    return str.replace(/^\/+|\/+$/g, '');
  }
}
