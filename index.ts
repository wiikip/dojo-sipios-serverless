import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

async function handler(_req: Request): Promise<Response> {

    const payload = {sim1: "chat", sim2: "chien", lang: "fr", type: "General Word2Vec"}

    const res: Promise<Response> = fetch("http://nlp.polytechnique.fr/similarityscore", {method: "POST", body: JSON.stringify(payload)})

  return new Response((await res).body);
}

serve(handler);