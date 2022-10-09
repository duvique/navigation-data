import { FindOptions } from 'mongodb';
import INavigationService, {
  IGetAllUserSessionsParams,
  IGetSessionParams,
  Navigation,
  Session,
} from './INavigationService';

export default class NavigationService implements INavigationService {
  public async getAllUserSessions({
    hash_user,
  }: IGetAllUserSessionsParams): Promise<Session[]> {
    const sessions = global.db.collection<Session>('session').find();

    return [];
  }

  public async getSession({
    session_id,
    show_id,
  }: IGetSessionParams): Promise<Session | null> {
    const session = await global.db
      .collection<Session>('session')
      .findOne({ session_id }, {
        showRecordId: show_id || false,
      } as FindOptions);

    return session;
  }

  public async insertNavigation({
    session_id,
    hash_user,
    created_at,
    url,
    url_base,
    endpoint,
  }: Navigation): Promise<Session> {
    const existingSession = await this.getSession({
      session_id,
      show_id: true,
    });

    const navigationObject = {
      url,
      url_base,
      endpoint,
      navigated_in: created_at,
    };
    if (existingSession) {
      const updateResult = await global.db
        .collection<Session>('session')
        .updateOne(
          { _id: existingSession._id },
          {
            updated_at: created_at,
            $push: {
              navigations: navigationObject,
            },
          },
        );

      console.log({ updateResult });
    } else {
      const insertResult = await global.db
        .collection<Session>('session')
        .insertOne({
          session_id,
          hash_user,
          started_at: created_at,
          updated_at: null,
          navigations: [],
        });

      console.log({ insertResult });
    }

    return {} as Session;
  }
}
