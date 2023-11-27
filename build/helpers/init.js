import cors from "cors";
import express from "express";
import morgan from "morgan";
import { Routes } from "../const.js";
import { AuthRouter, StudentRouter } from "../routes/index.routes.js";
export function gracefulShutdown(server) {
    console.log("Received shutdown signal. Shutting down gracefully...");
    server.close(function() {
        console.log("Server has been gracefully shut down.");
        // Perform any additional cleanup or resource release here
        // TODO:"Close the db connection"
        process.exit(0); // Exit the process
    });
}
export function defineMiddlewares(app) {
    // Croos origin resurce sharing
    app.use(cors({
        origin: "*",
        methods: [
            "POST",
            "GET",
            "PUT",
            "DELETE"
        ]
    }));
    // Logger middleware
    app.use(morgan("".concat(process.env.NODE_ENV === "development" ? "dev" : "tiny")));
    // Send public files
    app.use(express.static("public"));
    // Append the body to the request object
    app.use(express.json());
    // Routes
    // app.use(Routes.ccosto, CCostoRouter);
    // app.use(Routes.departament, DepartamentRouter);
    // app.use(Routes.destiny, DestinyRouter);
    // app.use(Routes.product, ProductRouter);
    // app.use(Routes.states, StateRouter);
    // app.use(Routes.province, ProvinceRouter);
    app.get("/ping", function(req, res) {
        return res.status(200).send("<h1>Pong !</h1>");
    });
    app.use(Routes.auth, AuthRouter);
    app.use(Routes.student, StudentRouter);
// app.use(Routes.user, UserRouter);
// app.use(Routes.request, RequestRouter);
// app.use(Routes.bill, BillRouter);
}
