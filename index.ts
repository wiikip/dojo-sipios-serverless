import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

const WORD_TO_FIND = "bûcheron";

type PolytechResponse = {
    result: string;
    simscore: number;
};

async function handler(_req: Request): Promise<Response> {

    const body = await _req.text();
    let params = new URLSearchParams(body);

    const guess = params.get("text");
    console.log(guess);

    const payload = {sim1: guess, sim2: WORD_TO_FIND, lang: "fr", type: "General Word2Vec"}

    const res: Promise<Response> = fetch("http://nlp.polytechnique.fr/similarityscore", {method: "POST", body: JSON.stringify(payload), headers: {"Content-Type": "application/json"}})


    const reponse : PolytechResponse = await res.then((res) => res.json())

    const responsePayload = {
        "response_type": "in_channel",
        "text": `La similarité entre "${guess}" et "${WORD_TO_FIND}" est de ${reponse.simscore}`,
        "delete_original": true
    }
    return new Response(JSON.stringify(responsePayload), {status: 200, headers: {"Content-Type": "application/json"}});
}

serve(handler);