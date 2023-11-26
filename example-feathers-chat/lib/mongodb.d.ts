import type { Db } from 'mongodb';
import type { Application } from './declarations';
declare module './declarations' {
    interface Configuration {
        mongodbClient: Promise<Db>;
    }
}
export declare const mongodb: (app: Application) => void;
