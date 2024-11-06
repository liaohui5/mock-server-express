import express from "express";
import cors from "cors";
import Mock from "mockjs";
const { mock } = Mock;

/////////////////////////////////////////////////
//                 init app                    //
/////////////////////////////////////////////////
const app = express();
const config = Object.freeze({
  port: 3000,
  enableCors: true,
  prefix: "/api",
  success(res, data = null) {
    res.json({
      success: true,
      msg: "success",
      data,
    });
  },
  error(res, data = null) {
    res.json({
      success: false,
      msg: "error",
      data,
    });
  },
});

// parse request body
app.use(express.json({ extended: true }));

// enable cors requests
if (config.enableCors) {
  app.use(cors());
}

/////////////////////////////////////////////////
//                  routes                     //
/////////////////////////////////////////////////
const { success, error } = config;
app.get("/", (_, res) => success(res));
app.get("/articles", (_, res) => {
  const articles = mock({
    page: 1,
    size: 10,
    "rows|10": [
      {
        id: "@id",
        title: "@ctitle",
        contents: "@cparagraph",
      },
    ],
  });

  success(res, articles);
});

// for post example
app.post("/login", (_, res) => {
  success(res, {
    "token": "mock-token-string",
  });
});

// for patch/put example
app.patch("/article/:id", (req, res) => {
  success(res, {
    id: req.params.id
  });
});

// for delete example
app.delete("/article/:id", (req, res) => {
  success(res, {
    id: req.params.id
  });
});

/////////////////////////////////////////////////
//                  listen                     //
/////////////////////////////////////////////////
app.listen(config.port, () => {
  const url = `http://localhost:${config.port}`;
  console.log(`server started on: ${url}`);
});
