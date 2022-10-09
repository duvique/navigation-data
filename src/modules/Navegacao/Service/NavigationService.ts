import { FindOptions } from 'mongodb';
import INavigationService, {
  IActionResponse,
  IDeleteSession,
  IGetAllUserSessionsParams,
  IGetSessionParams,
  IInsertNavigationOutput,
  InsertedNavigation,
  Navigation,
  Session,
} from './INavigationService';

export default class NavigationService implements INavigationService {
  private readonly collection = 'session';

  public async getAllUserSessions({
    hash_user,
  }: IGetAllUserSessionsParams): Promise<Session[]> {
    const sessions = await global.db.collection<Session>(this.collection).find(
      {
        hash_user,
      },
      {
        projection: { _id: 0 },
      } as FindOptions,
    );

    return sessions.toArray();
  }

  public async getSession({
    session_id,
    show_id,
  }: IGetSessionParams): Promise<Session | null> {
    const session = await global.db
      .collection<Session>(this.collection)
      .findOne({ session_id }, {
        projection: { _id: show_id === undefined ? false : show_id },
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
  }: Navigation): Promise<IInsertNavigationOutput> {
    const existingSession = await this.getSession({
      session_id,
      show_id: true,
    });

    const navigationObject: InsertedNavigation = {
      url,
      url_base,
      endpoint,
      navigated_in: created_at,
    };

    const collectionObject = global.db.collection<Session>(this.collection);
    let status = false;
    if (existingSession) {
      console.log(existingSession._id);

      const updateResult = await collectionObject.updateOne(
        { _id: existingSession._id },
        {
          $set: { updated_at: created_at },
          $push: {
            navigations: navigationObject,
          },
        },
      );

      status = updateResult.modifiedCount > 0;
    } else {
      const insertResult = await collectionObject.insertOne({
        session_id,
        hash_user,
        started_at: created_at,
        updated_at: null,
        navigations: [
          {
            url,
            url_base,
            endpoint,
            navigated_in: created_at,
          },
        ],
      });

      status = insertResult.insertedId !== undefined;
    }

    return { status, navigation: status ? navigationObject : null };
  }

  public async deleteNavigation({
    session_id,
  }: IDeleteSession): Promise<IActionResponse> {
    const result = await global.db
      .collection<Session>(this.collection)
      .deleteOne({ session_id });

    return { status: result.deletedCount > 0 };
  }
}
