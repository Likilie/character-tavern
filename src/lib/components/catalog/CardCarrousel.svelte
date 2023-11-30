<script lang="ts">
    import STCardPreview from "$lib/components/catalog/STCardPreview.svelte";
    import { search_cards } from "$lib/functions/api/search_cards";
    import { CacheMode, type Card, type SearchSort } from "$lib/type";
    import Loader from "../common/Loader.svelte";
    import { SearchFilterStore } from "$lib/stores/SearchFilter";

    export let title: string;
    let cards: Card[] = [];
    export let Card_Link: string | undefined = undefined;
    export let search_filter: SearchSort;
    export let cache: CacheMode = CacheMode.Default;

    $: $SearchFilterStore.nsfw, Refresh();

    async function Refresh() : Promise<void> {
        console.log("Fetching the cards for " + title + "...");
        cards = [];
        cards = (await search_cards({sort : search_filter, nsfw: $SearchFilterStore.nsfw, first: 20, page: 1}, cache = cache)).nodes;
    }

    // Manage carousel arrows and scroll
    
    let elemCarousel: HTMLDivElement;

    function carouselLeft(): void {
        const x =
            elemCarousel.scrollLeft === 0
                ? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
                : elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
        elemCarousel.scroll(x, 0);
    }

    function carouselRight(): void {
        const x =
            elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
                ? 0 // loop
                : elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
        elemCarousel.scroll(x, 0);
    }
</script>

<section class="w-full space-y-4 variant-filled-surface rounded p-6">
    <span class="flex justify-between font-bold"><h2 class="text-xl">{title}</h2> {#if Card_Link}<a href={Card_Link} class="text-lg font-thin">See all</a>{/if}</span>
    <div class="flex gap-4 items-center">
        {#if cards.length > 0}
        <button type="button" class="btn-icon variant-filled h-8 hidden md:block" on:click={carouselLeft}>
            <i class="fa-solid fa-arrow-left" />
        </button>
        <div bind:this={elemCarousel}  class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto pb-2">
            {#each cards as card (card.id)}
                <div>
                    <STCardPreview card={card} />
                </div>
            {/each}
        </div>
        <button type="button" class="btn-icon variant-filled h-8 hidden md:block" on:click={carouselRight}>
            <i class="fa-solid fa-arrow-right" />
        </button>
        {:else}
            <Loader text="Loading Recommendations 🔥" />
        {/if}
    </div>
</section>