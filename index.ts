import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

const WORD_TO_FIND = "bucheron";

type PolytechResponse = {
    result: string;
    simscore: number;
};

async function handler(_req: Request): Promise<Response> {

    const guess = _req;
    const body = await guess.text();
    console.log(body)

    const payload = {sim1: "chat", sim2: "chien", lang: "fr", type: "General Word2Vec"}

    const res: Promise<Response> = fetch("http://nlp.polytechnique.fr/similarityscore", {method: "POST", body: JSON.stringify(payload), headers: {"Content-Type": "application/json"}})


    const reponse : PolytechResponse = await res.then((res) => res.json())

    return new Response("Similarité entre " + payload.sim1 + " et " + payload.sim2 + " : " + reponse.simscore);
}

serve(handler);