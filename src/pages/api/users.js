// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getDbCollection } from "../../server/db";

/**
 * Add the user's email to the database and send a confirmation email
 * @param {NextApiRequest} req Next.js request object
 * @param {NextApiResponse} res Next.js response object
 * @returns 
 */
const signUpUser = async (req, res) => {
	try {
		const userCollection = await getDbCollection("users");

		await userCollection.insertOne(req.body);

		// 201 status code (Resource created) and return confirmation message
		return res.status(201).json({ message: "Thank you for signing up! We will be in touch shortly" });
	} catch (e) {
		// 500 status code (Internal Server Error) and return error message
		return res.status(500).json({ message: "An internal error occured. Try again later" });
	}
};

const controllers = {
	POST: signUpUser
};

/**
 * 
 * @param {NextApiRequest} req Next.js request object
 * @param {NextApiResponse} res Next.js response object
 * @returns 
 */
export default function router(req, res) {
	// Defined for endpoint POST /api/users (see controllers object)
	const controller = controllers[req.method];

	// Return 501 status code (Method Not Implemented) if non-POST method is invoked
	if (!controller)
		return res.status(501).json({ message: "Method not implemented" });

	return controller(req, res);
}
