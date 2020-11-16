import {BFastConfig} from '../conf';
import {HttpClientAdapter, RestRequestConfig} from '../adapters/HttpClientAdapter';
import {AuthController} from './AuthController';

export class FunctionsController {

  constructor(private readonly functionPath: string,
              private readonly restApi: HttpClientAdapter,
              private readonly authAdapter: AuthController,
              private readonly appName = BFastConfig.DEFAULT_APP) {
  }

  async post<T>(body?: { [key: string]: any; }, config?: RestRequestConfig): Promise<T> {
    if (this.functionPath && this.functionPath !== '') {
      const postConfig: RestRequestConfig = {};
      if (config && config.headers) {
        Object.assign(postConfig, config);
      } else {
        Object.assign(postConfig, config);
      }
      // const user = await this.authAdapter.currentUser();
      // postConfig.headers['authorization'] = `Bearer ${user?.sessionToken}`;
      const value = await this.restApi.post(
        BFastConfig.getInstance().functionsURL(this.functionPath, this.appName) as string,
        body ? body : {},
        postConfig
      );
      return value.data;
    } else {
      throw {code: -1, message: 'Please provide function path'};
    }
  }

  async delete<T>(config?: RestRequestConfig): Promise<T> {
    const deleteConfig: RestRequestConfig = {};
    if (config && config.headers) {
      Object.assign(deleteConfig, config);
    } else {
      Object.assign(deleteConfig, config);
    }
    const response = await this.restApi.delete(
      BFastConfig.getInstance().functionsURL(this.functionPath, this.appName) as string,
      deleteConfig
    );
    return response.data;
  }

  async get<T>(config?: RestRequestConfig): Promise<T> {
    const getConfig: RestRequestConfig = {};
    if (config && config.headers) {
      Object.assign(getConfig, config);
    } else {
      Object.assign(getConfig, config);
    }
    const response = await this.restApi.get(
      BFastConfig.getInstance().functionsURL(this.functionPath, this.appName) as string,
      getConfig
    );
    return response.data;
  }

  async put<T>(body?: { [p: string]: any }, config?: RestRequestConfig): Promise<T> {
    const putConfig: RestRequestConfig = {};
    if (config && config.headers) {
      Object.assign(putConfig, config);
    } else {
      Object.assign(putConfig, config);
    }
    const response = await this.restApi.put(BFastConfig.getInstance().functionsURL(this.functionPath, this.appName) as string,
      body ? body : {},
      putConfig
    );
    return response.data;
  }


}
