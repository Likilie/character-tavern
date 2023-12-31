import type { SearchFilter } from "$lib/functions/api/search_cards";
import { SearchSort } from "$lib/type";
import { writable } from "svelte/store";

const defaultSearchFilter: SearchFilter = {
    nsfw: false,
    require_expressions: false,
    search: "",
    asc: false,
    first: 48,
    nsfw_only: false,
    page: 0,
    sort: SearchSort.star_count,
};

export const SearchFilterStore = writable<SearchFilter>(defaultSearchFilter);