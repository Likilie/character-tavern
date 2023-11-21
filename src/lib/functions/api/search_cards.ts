import { CacheMode, type Card, type SearchSort } from "$lib/type";

const  API_BASE_URL: URL = new URL('https://api.chub.ai/api/characters/search');


export async function search_cards(filter: SearchFilter | undefined, cache: CacheMode = CacheMode.Default): Promise<Root> {
    try {
        API_BASE_URL.search = new URLSearchParams(generateSearchQuery(filter)).toString();
        const API_URL: string = API_BASE_URL.toString();
        console.log("Doing an API call to: " + API_URL);
        const res = await fetch(API_URL.toString(), {cache: cache});
        if (!res.ok) {
            const error_message = `Error in search_cards API call: ${res.status} (${res.statusText})`;
            console.error(error_message);
        }
        const data: Root = await res.json();
        return data;
    } catch (error: unknown) {
        console.error("Error in search_cards API call: ", error);
        throw error;  // Re-throw the error so that the caller is aware and can handle it if required.
    }
}

function generateSearchQuery(filter: SearchFilter | undefined): URLSearchParams {
    if (!filter) {
        return new URLSearchParams();
    }
    const params: URLSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(filter)) {
        if (!value || value === "") {
            console.log("Skipping empty value for key: " + key);
            continue;
        } else {
            console.log("Adding key: " + key + " with value: " + value);
        }
        if (key === "page") {
            const newPage: number = value as number + 1;
            params.append(key, newPage.toString());
        } else {
            params.append(key, value.toString());
        }
    }
    return params;
}

export type SearchFilter = {
    nsfw? : boolean,
    sort? : SearchSort,
    require_expressions?: boolean,
    search?: string,
    asc?: boolean,
    exclude_tags?: string[],
    tags?: string[],
    first: number,
    nsfw_only?: boolean,
    require_lore?: boolean,
    min_tokens?: number,
    max_tokens?: number,
    page: number,
}

export interface Root {
    count: number
    nodes: Card[]
    page: number
  }
  