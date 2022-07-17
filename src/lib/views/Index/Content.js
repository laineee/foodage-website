import { useState } from "react";
import axios from "axios";
import { isValidEmail } from "../../utils";

function Content() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState(null);
	const [confirmation, setConfirmation] = useState("");

	/**
	 * Keep the email value in sync with 
	 * the text inside the input field
	 * @param event HTML input change event
	 */
	const handleChange = event => {
		const { value } = event.target;
		setEmail(value);

		if (value.length > 5 && !isValidEmail(value))
			setError("Must be a valid email address");
		else
			setError(null);
	}

	/**
	 * Sign up a new user with their email address
	 * @param event HTML form submit event
	 */
	const handleSubmit = async event => {
		// Prevent the page from doing a full reload when the form is submitted
		event.preventDefault();

		try {
			// Reset error prior to submission
			setError(null);

			// Submit the data to the server
			const res = await axios.post("/api/users", { email });

			// Set the confirmation value so a confirmation message appears on the screen
			// from the server (res)ponse
			setConfirmation(res.data.message);
		} catch (err) {
			// Display a error message if something went wrong
			setError(err.message);
		}
	};

	return (
		<div>
			<div className="container content">
				<div className="row">
					<div className="col-sm-4 talk">
						<h1>
							Plan your Staffing and Food Prep.
							<br />
							Accurately.
						</h1>
						<br />
						<h6 className="bold-four">
							Reduce your waste with an accurate demand forecasting solution that shows you what your daily sales will be, and why.
						</h6>
						<h6 className="bold-four">
							Foodage shows you weekly sales forecasts that take weather events,
							holidays, and shutdowns into account and
							are customized toyour restaurant.
						</h6>
						<br />
						<form className="form-inline" onSubmit={handleSubmit}>
							<div className="form-group">
								<input
									placeholder="Email..."
									value={email}
									onChange={handleChange}
									className="form-control"
								/>
								<button type="submit" className="ml-2 btn btn-dark start start-two">Tell me more</button>
							</div>
							{error && <small className="text-danger">{error}</small>}
							{confirmation && <small className="text-success">{confirmation}</small>}
						</form>
					</div>
					<div className="col-sm-8 showcase-img">
						{/* <div className="circle"></div> */}
					</div>
				</div>
			</div>

			<section className="features-icons bg-light text-center det-ails">
				<div className="container">
					<div className="row">
						<div className="col-lg-4">
							<div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
								<div className="features-icons-icon d-flex  icon-bra-ails">
									<i className="icon-screen-desktop m-auto text-primary icon-ails"></i>
								</div>
								<h5>Lower your Prime Costs</h5>
								<p className="lead mb-0">Prime Costs = Cost of goods sold + Total labour costs. Avoid under or over preparing.</p>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
								<div className="features-icons-icon d-flex  icon-bra-ails">
									<i className="icon-layers m-auto text-primary icon-ails"></i>
								</div>
								<h5>Plan staffing</h5>
								<p className="lead mb-0">Manage the labour shortage by knowing how many people to schedule for each shift.</p>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="features-icons-item mx-auto mb-0 mb-lg-3">
								<div className="features-icons-icon d-flex  icon-bra-ails">
									<i className="icon-check m-auto text-primary icon-ails"></i>
								</div>
								<h5>Reduce waste</h5>
								<p className="lead mb-0">Eliminate avoidable food waste by gaining clarity on how much to prep for each service.</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Content;