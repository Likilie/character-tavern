<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

    import SearchBar from '$lib/components/nav/SearchBar.svelte';
    import Footer from '$lib/components/nav/Footer.svelte';
    import NsfwTogle from '$lib/components/nav/NSFWTogle.svelte';
	import LOGO_CT from '$lib/assets/icons/CT_LOGO.png';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });


	function NotAvailable() {
		alert("This feature isn't up and running here yet. Check out chub.ai to use it.");
	}

	// VERCEL ANALYTICS
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	
	inject({ mode: dev ? 'development' : 'production' });
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar class="block lg:hidden">
			<svelte:fragment slot="lead"><a href="/" class="flex justify-center items-center h-full uppercase font-bold text-xl" slot="lead"><img src={LOGO_CT} alt="Character Tavern Logos" class="h-9"/> Character Tavern</a></svelte:fragment>
			<svelte:fragment slot="trail"><NsfwTogle /></svelte:fragment>
			<svelte:fragment slot="headline"><SearchBar /></svelte:fragment>
		</AppBar>
		<AppBar class="hidden lg:block">
			<a href="/" class="flex justify-center items-center h-full uppercase font-bold text-xl" slot="lead"><img src={LOGO_CT} alt="Character Tavern Logos" class="h-9"/> Character Tavern</a>
			<SearchBar/>
			<svelte:fragment slot="trail">
				<a href="/character/catalog" class="btn bg-primary-500 font-bold flex gap-2"><i class="fa-solid fa-person-dress"></i> Characters</a>
				<button class="btn bg-surface-500 font-bold flex gap-2" on:click={NotAvailable}><i class="fa-solid fa-book-bookmark"></i> Lorebook</button>
				<NsfwTogle />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>