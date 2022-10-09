import { ObjectId } from 'mongodb';

export interface ISessionIdentifier {
  session_id: string;
  hash_user: string;
}

interface INavigationUrl {
  url: string;
  url_base: string;
  endpoint: string;
}

export type InsertedNavigation = INavigationUrl & { navigated_in: Date };

export type Session = ISessionIdentifier & {
  _id?: ObjectId | string;
} & {
  started_at: Date;
  updated_at: Date | null;
  navigations: InsertedNavigation[];
};

export interface IActionResponse {
  status: boolean;
}

export type Navigation = ISessionIdentifier &
  INavigationUrl & {
    created_at: Date;
  };

export interface IGetAllUserSessionsParams {
  hash_user: string;
}

export interface IGetSessionParams {
  session_id: string;
  show_id?: boolean;
}

export interface IInsertNavigationOutput extends IActionResponse {
  navigation: InsertedNavigation | null;
}

export interface IDeleteSession {
  session_id: string;
}

export default interface INavigationService {
  getAllUserSessions(params: IGetAllUserSessionsParams): Promise<Session[]>;

  getSession(params: IGetSessionParams): Promise<Session | null>;

  insertNavigation(navigation: Navigation): Promise<IInsertNavigationOutput>;

  deleteNavigation(params: IDeleteSession): Promise<IActionResponse>;
}
