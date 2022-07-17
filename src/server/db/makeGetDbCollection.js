import { connectDb } from "./connectDb";

export const makeGetDbCollection = url => {
	const getDbCollection = async name => {
		try {
			const db = await connectDb(url);

			return db.collection(name);
		} catch (e) {
			throw new Error("Database service is currently unavailable");
		}
	};

	return getDbCollection;
};