<script lang="ts">
    import CardCarrousel from "$lib/components/catalog/CardCarrousel.svelte";
    import { CacheMode, SearchSort } from "$lib/type";
</script>

<svelte:head>
	<title>Home | Character Tavern</title>
	<meta name="description" content="Welcome to Character Tavern, the premier destination for AI character cards tailored for immersive roleplaying experiences. Discover a vast, uncensored collection compatible with SillyTavern, Chub Venus, and RisuAI, catering to all roleplay genres. Embark on your next adventure with our unique, engaging characters!">
</svelte:head>

<main class="mx-auto p-6 space-y-6">
	<section class="text-4xl md:text-5xl rounded md:p-6 gap-2 md:gap-12 text-center w-full flex flex-col justify-center items-center">
		<h1 class="font-black md:w-3/6">Download and Chat with Immersive and Uncensored <span class="text-primary-500">AI-Character Cards</span></h1>
		<p class="md:w-3/6 text-lg font-thin">Dive into the ultimate roleplay fun with our AI-Character Cards! Perfectly compatible with SillyTavern, Chub Venus, and RisuAI, these gems from Chub.ai are your ticket to a wildly imaginative adventure.</p>
		<a href="/character/catalog" class="btn variant-filled-surface font-bold flex gap-2"><i class="fa-solid fa-book-open"></i> Explore The Catalog</a>
	</section>
	<CardCarrousel title="Trending Right Now 🔥" search_filter={SearchSort.trending_downloads}/>
	<CardCarrousel title="New Cards 🕰️" search_filter={SearchSort.created_at} cache={CacheMode.NoStore}/>
	<section class="flex flex-col justify-center items-center text-center gap-6 p-6 rounded cotainer variant-filled-surface">
		<h2 class="font-black text-4xl">Not Finding Something Interresting ? <span class="text-primary-500">Try The Catalog !</span></h2>
		<a href="/character/catalog" class="btn variant-filled-primary flex justify-center items-center gap-2"><i class="fa-solid fa-book-open"></i> Go to catalog</a>
	</section>
</main>