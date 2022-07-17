
export const buildMakeCollection = db => {
	const makeCollection = async ({
		name,
		validator,
		indexes = [{ key: { id: 1 }, name: "id_1" }]
	}) => {
		const checkExistingCollection = ({ collectionName }) =>
			collectionName === name;

		const existingCollections = await db.collections();
		let collection = existingCollections.find(checkExistingCollection);

		if (!collection)
			collection = await db.createCollection(name, { validator });

		collection.createIndexes(indexes);

		return collection;
	};

	return makeCollection;
};