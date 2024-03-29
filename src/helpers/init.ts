import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import { Server } from "node:http";
import { Routes } from "../const.js";
import {
  AuthRouter,
  StudentRouter,
  ProfesoresRouter,
  ProjectsRouter,
  CourtRouter,
  SearchRouter,
  EvalRouter,
  FilesRouter,
  DefenseRouter,
  ARanksRouter,
} from "../routes/index.routes.js";
import { getKeywords } from "../controllers/others.js";
export function gracefulShutdown(server: Server) {
  console.log("Received shutdown signal. Shutting down gracefully...");
  server.close(() => {
    console.log("Server has been gracefully shut down. ");
    // Perform any additional cleanup or resource release here
    // TODO:"Close the db connection"
    process.exit(0); // Exit the process
  });
}

export function defineMiddlewares(app: Application) {
  // Croos origin resurce sharing
  app.use(
    cors({
      origin: "*",
      methods: ["POST", "GET", "PUT", "DELETE"],
    })
  );

  // Logger middleware
  app.use(morgan(`${process.env.NODE_ENV === "development" ? "dev" : "tiny"}`));
  // Send public files
  app.use(express.static("public"));
  // Append the body to the request object
  app.use(express.json());

  // Routes

  app.get("/ping", (req, res) => {
    return res.status(200).send("<h1>Pong !</h1>");
  });
  app.use(Routes.auth, AuthRouter);
  app.use(Routes.student, StudentRouter);
  app.use(Routes.tesis_project, ProjectsRouter);
  app.use(Routes.profesor, ProfesoresRouter);
  app.use(Routes.court, CourtRouter);
  app.use(Routes.search, SearchRouter);
  app.use(Routes.auth, AuthRouter);
  app.use(Routes.eval, EvalRouter);
  app.use(Routes.files, FilesRouter);
  app.use(Routes.defense, DefenseRouter);
  app.use(Routes.aranks, ARanksRouter);
  app.use("/api/keywords", getKeywords);
}
