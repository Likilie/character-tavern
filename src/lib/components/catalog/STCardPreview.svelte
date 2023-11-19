<script lang="ts">
    import type { Card } from "$lib/type";
    import { popup, type PopupSettings } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    export let card: Card;

    const AVATAR_URL_BASE: string = "https://avatars.charhub.io/avatars/";
    const AVATAR_URL: string = AVATAR_URL_BASE + card.fullPath + "/tavern.png";
    const CARD_TITLE: string = card.name;
    const CARD_NSFW: boolean = card.topics.includes("NSFW");
    const CARD_HAS_EXPR: boolean = card.labels.some(label => label.title === "EXPR");
    const CARD_HAS_LOREBOOK: boolean = card.related_lorebooks && card.related_lorebooks.length > 0;
    const CARD_DESCRIPTION: string = !card.tagline || card.tagline == "Creator's notes go here." ? "No description provided by the card creator..." : card.tagline;
    const CARD_LINK = "/character/" + card.fullPath;
    const CARD_TAGS: string[] = card.topics.slice(0, 4); // TODO: ADD FILTER TO TAGS

    export const NSFWPopupHover: PopupSettings = {
        event: 'hover',
        target: 'NSFWPopupHover',
        placement: 'top'
    };

    export const EXPRPopupHover: PopupSettings = {
        event: 'hover',
        target: 'EXPRPopupHover',
        placement: 'top'
    };

    export const LorePopupHover: PopupSettings = {
        event: 'hover',
        target: 'LorePopupHover',
        placement: 'top'
    };

    let isInView = false;
    let CARD_HTML: HTMLElement;

    onMount(() => {
        // Creating a new IntersectionObserver which will watch for when the observed element 
        // comes into or goes out of the viewport.
        const observer = new IntersectionObserver(([entry]) => {
            // Setting 'isInView' to true if the element is intersecting (visible) in the viewport,
            // otherwise false. This is based on the observer's threshold setting.
            isInView = entry.isIntersecting;
        }, { threshold: 0.01 }); // The threshold of 0.1 means the callback will execute when at least 10% of the element is visible.

        // Starting to observe the CARD_HTML element with the observer.
        observer.observe(CARD_HTML);

        // Returning a cleanup function that disconnects the observer when the component is destroyed.
        // This is important to prevent memory leaks.
        return () => observer.disconnect();
    });


</script>

<a href={CARD_LINK} bind:this={CARD_HTML} class="snap-start shrink-0 card min-w-[15rem] w-full min-h-[24rem] h-full group flex flex-col justify-end gap-4 rounded-xl cursor-pointer bg-no-repeat bg-center bg-cover overflow-hidden text-start" style:background-image={isInView ? `url('${AVATAR_URL}')` : ''}>
    <div class="flex flex-col justify-end gap-2 p-2 bg-gradient-to-t from-black to-transparent group-hover:h-full">
        <span class="flex gap-2 items-center"><p class="font-black text-xl">{#if CARD_NSFW}<span class="[&>*]:pointer-events-none" use:popup={NSFWPopupHover}>🔞</span>{/if} {#if CARD_HAS_EXPR}<span class="[&>*]:pointer-events-none" use:popup={EXPRPopupHover}>😍</span>{/if} {#if CARD_HAS_LOREBOOK}<span class="[&>*]:pointer-events-none" use:popup={LorePopupHover}>📖</span>{/if} {#if CARD_HAS_EXPR || CARD_NSFW || CARD_HAS_LOREBOOK}|{/if} {CARD_TITLE}</p> </span>
        <div class="flex h-fit w-full"><p class="group-hover:line-clamp-6 line-clamp-4 md:line-clamp-2">{CARD_DESCRIPTION}</p></div>
        <div class="flex flex-wrap items-start justify-start gap-1 w-full">{#each CARD_TAGS as tag}<span class="badge variant-fillel variant-filled-surface dark">{tag}</span>{/each}</div>
    </div>
</a>

<div class="card p-4 variant-filled-primary" data-popup="NSFWPopupHover" style="z-index: 7;">
	<p>This card contains NSFW content.</p>
	<div class="arrow variant-filled-primary" />
</div>
<div class="card p-4 variant-filled-primary" data-popup="EXPRPopupHover" style="z-index: 7;">
	<p>This card contains an expression pack.</p>
	<div class="arrow variant-filled-primary" />
</div>
<div class="card p-4 variant-filled-primary" data-popup="LorePopupHover" style="z-index: 7;">
	<p>This card use a custom Lorebook.</p>
	<div class="arrow variant-filled-primary" />
</div>
