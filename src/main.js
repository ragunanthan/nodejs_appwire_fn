import { Client, Databases, ID } from "node-appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('651ba3e2b315e3c5e77b');

const databases = new Databases(client);


// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // Why not try the Appwrite SDK?
  //
  // const client = new Client()
  //    .setEndpoint('https://cloud.appwrite.io/v1')
  //    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
  //    .setKey(process.env.APPWRITE_API_KEY);

  // You can log messages to the console
  log("Hello, Logs!");

  // If something goes wrong, log an error
  error("Hello, Errors!");

  // The `req` object contains the request data
  if (req.method === "GET") {
    const url =
      "https://amazonlive.p.rapidapi.com/product?asin=B095JCHDMV&location=us";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "cb7fd9219cmsh061b0c7aa0470e0p1995f2jsnf40a3bc0d352",
        "X-RapidAPI-Host": "amazonlive.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();

    const promise = await databases.createDocument(
      '651ba3f89aaa3cdb51cc',
      '651c29bd96294003de7f',
      ID.unique(),
      result
    );
      return res.send("success", promise);
    } catch (error) {
      return res.send(error);
    }
   
  }

  // `res.json()` is a handy helper for sending JSON
  return res.json({
    motto: "Build Fast. Scale Big. All in One Place.",
    learn: "https://appwrite.io/docs",
    connect: "https://appwrite.io/discord",
    getInspired: "https://builtwith.appwrite.io",
  });
};
