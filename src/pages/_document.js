import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link href="css/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
				<link href="css/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" />
				<link href="css/vendor/simple-line-icons/css/simple-line-icons.css" rel="stylesheet" type="text/css" />
				<link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet"
					type="text/css" />
				<link href="css/css/landing-page.min.css" rel="stylesheet" />
				<link href="css/style.css" rel="stylesheet" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}