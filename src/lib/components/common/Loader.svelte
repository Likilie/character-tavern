<script lang="ts">
    import { ProgressRadial } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    export let text: string;

    let ShowStaleMessage: boolean = false;

    onMount(() => {
        setTimeout(() => {
            ShowStaleMessage = true;
        }, 10000);
    });

</script>
<section class="flex flex-col gap-4 justify-center items-center">
<span class="flex gap-4 font-bold justify-center items-center"><ProgressRadial meter="stroke-primary-500" value={undefined} width="w-10"/>{text}</span>
{#if ShowStaleMessage}
    <aside class="alert variant-ghost-error w-3/4"><div class="alert-message"><h3 class="h3">⚠️ Error loading your Cards</h3>This message doesn't disappear, it's mean that either the server is down or no Cards are found for your query</div></aside>
{/if}
</section>