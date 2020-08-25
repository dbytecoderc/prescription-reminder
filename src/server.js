import express from "express";
import "@babel/polyfill";
import dotenv from "dotenv";
import morgan from "morgan";
import http from 'http';
import router from "./routes";
import dbconnect from "./db/connection.db";

const app = express();

const PORT = process.env.PORT || 5000;

// enable morgan logs only in development environment
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}


// enable use of dotenv config file.
dotenv.config();

app.use(
	express.urlencoded({
		extended: false,
	})
);

app.use(express.json());

// API routes
app.use("/api/v1", router);

// Handling unavailable routes
app.all("*", (req, res) =>
	res.status(405).json({
		error: "Method not allowed",
	})
);


const server = http.createServer(app);


dbconnect().then(async () => {
	if (!module.parent) {
		server.listen(PORT);
		server.on("listening", async () => {
			console.info(`Listening on port ${PORT || 5000}`);
		});
	}
});

export default app;