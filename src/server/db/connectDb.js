import { MongoClient } from "mongodb";

let client, cachedDb;

export const connectDb = async (url, opts) => {
	client = new MongoClient(url, opts);

	client.on("open", () => console.log("Mongodb client connected..."));

	if (cachedDb)
		return cachedDb;

	try {
		await client.connect();

		await client.db("admin").command({ ping: 1 });

		const db = client.db();
		cachedDb = db;

		return db;
	} catch (e) {
		console.error(e);
	}
};

export default connectDb;