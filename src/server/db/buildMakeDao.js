import { makeGetDbCollection } from ".";


export const buildMakeDao = url => {
	const getDbCollection = makeGetDbCollection(url);

	const makeDao = name => {
		const defaultOpts = {
			sort: { id: 1 },
			limit: 9999
		};
		const defaultProjection = { _id: 0, __v: 0 };

		const insertOne = async entity => {
			const collection = await getDbCollection < T > (name);

			return await collection.insertOne(entity);
		};

		const insertMany = async entities => {
			const collection = await getDbCollection(name);

			return await collection.insertMany(entities);
		};

		const findById = async (id, projection = defaultProjection) => {
			const collection = await getDbCollection(name);

			return await collection.findOne({ id }, { projection });
		};

		const findBy = async (filter = {}, projection = defaultProjection) => {
			const collection = await getDbCollection < T > (name);

			return await collection.findOne(filter, { projection });
		};

		/**
		 * 
		 * @param {} filter 
		 * @param {} opts 
		 * @returns {}
		 */
		const findAll = async (
			filter = {},
			{
				limit = defaultOpts.limit,
				projection,
				sort = defaultOpts.sort
			} = defaultOpts
		) => {
			const collection = await getDbCollection(name);

			const cursor = collection
				.find(filter, { projection })
				.sort(sort)
				.limit(limit);

			return await cursor.toArray();
		};

		const updateOne = async entity => {
			const collection = await getDbCollection(name);

			const doc = await collection.findOneAndUpdate(
				{ id: entity.id },
				{ $set: entity }
			);

			return doc;
		};
		const updateMany = async (filter, $set) => {
			const collection = await getDbCollection(name);

			const doc = await collection.updateMany(filter, { $set });

			return doc;
		};

		const deleteOne = async id => {
			const collection = await getDbCollection(name);

			return await collection.findOneAndDelete({ id });
		};

		const deleteMany = async filter => {
			const collection = await getDbCollection(name);

			return await collection.deleteMany(filter);
		};

		const pushInner = async (filter, $push) => {
			const collection = await getDbCollection(name);

			if (typeof filter === "string")
				filter = { id: filter };

			const doc = await collection.findOneAndUpdate(filter, { $push });

			return doc.value;
		};

		const updateInner = async (filter, $set) => {
			const collection = await getDbCollection(name);

			const doc = await collection.findOneAndUpdate(filter, { $set });

			return doc.value;
		};

		const removeInner = async (filter, $unset) => {
			const collection = await getDbCollection(name);

			const doc = await collection.findOneAndUpdate(filter, { $unset });

			return doc.value;
		};

		const removeManyInner = async (filter, $unset) => {
			const collection = await getDbCollection(name);

			const doc = await collection.updateMany(filter, { $unset });

			return doc;
		};

		const pullInner = async (filter, $pull) => {
			const collection = await getDbCollection(name);

			if (typeof filter === "string")
				filter = { id: filter };

			const doc = await collection.findOneAndUpdate(filter, { $pull });

			return doc.value;
		};

		return {
			insertOne,
			insertMany,
			findById,
			findAll,
			findBy,
			updateOne,
			updateMany,
			deleteOne,
			deleteMany,
			pushInner,
			updateInner,
			removeInner,
			removeManyInner,
			pullInner
		};
	};

	return makeDao;
};

export default buildMakeDao;