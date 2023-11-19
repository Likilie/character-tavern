<script lang="ts">
    import Filter from "$lib/components/catalog/Filter.svelte";
    import StCardPreview from "$lib/components/catalog/STCardPreview.svelte";
    import Loader from "$lib/components/common/Loader.svelte";
    import { search_cards, type Root } from "$lib/functions/api/search_cards";
    import { SearchFilterStore } from "$lib/stores/SearchFilter";
    import { CacheMode, type Card } from "$lib/type";
    import {  Paginator, type PaginationSettings } from "@skeletonlabs/skeleton";
    import { onDestroy, onMount } from "svelte";

    let Cards: Card[] = [];

    let Meta: Root | undefined;

    let Unsubscribe: () => void;

    let paginationSettings = {
        page: $SearchFilterStore.page,
        limit: $SearchFilterStore.first,
        size: 0,
        amounts: [Cards.length/2 ,Cards.length, Cards.length*2],
    } satisfies PaginationSettings; 

    onMount(async () => {
        Unsubscribe = SearchFilterStore.subscribe(async () => {
            await Search();
        });
    });

    onDestroy(() => {
        if (Unsubscribe) {
            console.log("Unsubscribing from SearchFilterStore in Catalog");
            Unsubscribe();
        }
    });

    async function Search() {
        Cards = [];
        Meta = await search_cards($SearchFilterStore, CacheMode.NoStore);
        Cards = Meta.nodes;
    }

    $: paginationSettings = {
        page: $SearchFilterStore.page,
        limit: $SearchFilterStore.first,
        size: Meta?.count ?? 0,
        amounts: [Cards.length],
    } satisfies PaginationSettings;

    function onPageChange(e: CustomEvent): void {
        $SearchFilterStore.page = e.detail;
    }

    let isFilterOpen: boolean = false;

</script>

<svelte:head>
	<title>AI Character Cards Catalog | Character Tavern</title>
    <meta name="description" content="Explore our extensive AI Character Card Catalog, compatible with SillyTavern, Chub Venus, and RisuAI. Discover a diverse and uncensored collection, perfect for all genres of roleplay. Dive into the limitless possibilities for your next adventure at Character Tavern.">
</svelte:head>

<main class="m-4 grid grid-cols-6 gap-6">
    <div class="hidden lg:block">
        <Filter />
    </div>
    <section class="col-span-6 lg:col-span-5 space-y-6">
        <div>
            <h1 class="text-3xl font-bold">Card Catalog</h1>
            <p class="font-thin">Data from <a href="https://chub.ai" target="_blank" class="underline">Chub.ai</a> <i class="fa-solid fa-square-arrow-up-right"></i></p>
        </div>
        <button class="btn variant-filled-surface block lg:hidden" on:click={() => isFilterOpen = !isFilterOpen}><i class="fa-solid fa-filter"></i> Filter</button>
        {#if isFilterOpen}
            <Filter />
        {/if}
        {#if Cards.length == 0}
            <Loader text="Loading your cards..." />
        {:else}   
            <div class="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {#each Cards as card (card.id)}
                    <StCardPreview card={card} />
                {/each}
            </div>
        {/if}
    <Paginator on:page={onPageChange} bind:settings={paginationSettings} showNumerals showFirstLastButtons="{true}" showPreviousNextButtons="{true}" />
    </section>
</main>