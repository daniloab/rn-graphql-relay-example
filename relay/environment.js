import { Environment, Network, RecordSource, Store } from "relay-runtime";

const fetchQuery = async (request, variables) => {
  const body = JSON.stringify({
    query: request.text,
    variables,
  });

  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
    "X-Parse-Application-Id": "X-Parse-Application-Id",
    "X-Parse-Client-Key": "X-Parse-Client-Key",
  };

  try {
    const response = await fetch(`https://parseapi.back4app.com/graphql`, {
      method: "POST",
      headers,
      body,
    });

    const data = await response.json();

    if (data.errors) {
      throw data.errors;
    }

    return data;
  } catch (err) {
    console.log("err on fetch graphql", err);

    throw err;
  }
};

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
