/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    API_TOKEN: string;
    MONGODB_USERNAME: string;
    MONGODB_PWD: string;
    MONGODB_DATABASE: string;
  }
}
