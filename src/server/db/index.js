import { buildMakeDao } from "./buildMakeDao";
import { makeGetDbCollection } from "./makeGetDbCollection";

export * from "./buildMakeCollection";
export * from "./connectDb";
export * from "./makeGetDbCollection";

const { DB_URL } = process.env;

if (!DB_URL)
	throw new Error("DB_URL is undefined");

export const makeDao = buildMakeDao(DB_URL);
export const getDbCollection = makeGetDbCollection(DB_URL);