<script lang="ts">
    import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
    export let CARD_PERSONNALITY: string;
    export let CARD_DESCRIPTION: string;
    export let CARD_FIRST_MESSAGE: string;
    export let CARD_EXAMPLE_MESSAGE: string;
    export let CARD_SCENARIO: string;
    export let CARD_ALTERNATIVE_GREETINGS: string;
    export let CARD_SYSTEM_PROMPT: string;
    export let CARD_POST_HISORY_INSTRUCTIONS: string;
</script>

<div class="dark w-full">
<div class="container-section flex flex-col gap-6">
    <h2 class="font-bold text-xl">📖 Card Definition (Spoilers ahead)</h2>
    <Accordion class="font-bold"> <!--TODO: Add System Prompt-->
        {#if CARD_SCENARIO}
        <AccordionItem>
            <svelte:fragment slot="lead">📕</svelte:fragment>
            <svelte:fragment slot="summary">Scenario</svelte:fragment>
            <svelte:fragment slot="content"><p class="font-normal whitespace-pre-wrap">{CARD_SCENARIO}</p></svelte:fragment>
        </AccordionItem>
        {/if}
        {#if CARD_PERSONNALITY}
            <AccordionItem>
                <svelte:fragment slot="lead">😜</svelte:fragment>
                <svelte:fragment slot="summary">Personnality</svelte:fragment>
                <svelte:fragment slot="content"><p class="font-normal whitespace-pre-wrap">{CARD_PERSONNALITY}</p></svelte:fragment>
            </AccordionItem>
        {/if}
        <AccordionItem>
            <svelte:fragment slot="lead">🤔</svelte:fragment>
            <svelte:fragment slot="summary">Description</svelte:fragment>
            <svelte:fragment slot="content"><p class="font-normal whitespace-pre-wrap">{CARD_DESCRIPTION}</p></svelte:fragment>
        </AccordionItem>

        <AccordionItem>
            <svelte:fragment slot="lead">💬</svelte:fragment>
            <svelte:fragment slot="summary">First Message</svelte:fragment>
            <svelte:fragment slot="content"><p class="font-normal whitespace-pre-wrap">{CARD_FIRST_MESSAGE}</p></svelte:fragment>
        </AccordionItem>
        {#if CARD_EXAMPLE_MESSAGE}
        <AccordionItem>
            <svelte:fragment slot="lead">👀</svelte:fragment>
            <svelte:fragment slot="summary">Examples Messages</svelte:fragment>
            <svelte:fragment slot="content"><p class="font-normal whitespace-pre-wrap">{CARD_EXAMPLE_MESSAGE}</p></svelte:fragment>
        </AccordionItem>
        {/if}
        {#if CARD_SYSTEM_PROMPT}
        <AccordionItem>
            <svelte:fragment slot="lead">🤖</svelte:fragment>
            <svelte:fragment slot="summary">System Prompt</svelte:fragment>
            <svelte:fragment slot="content"><p class="font-normal whitespace-pre-wrap">{CARD_SYSTEM_PROMPT}</p></svelte:fragment>
        </AccordionItem>
        {/if}
        {#if CARD_ALTERNATIVE_GREETINGS}
        <AccordionItem>
            <svelte:fragment slot="lead">🔠</svelte:fragment>
            <svelte:fragment slot="summary">Alternative Greetings Messages</svelte:fragment>
            <svelte:fragment slot="content"><p class="font-normal whitespace-pre-wrap">{CARD_ALTERNATIVE_GREETINGS}</p></svelte:fragment>
        </AccordionItem>
        {/if}
        {#if CARD_POST_HISORY_INSTRUCTIONS}
        <AccordionItem>
            <svelte:fragment slot="lead">📝</svelte:fragment>
            <svelte:fragment slot="summary">Post History Instructions</svelte:fragment>
            <svelte:fragment slot="content"><p class="font-normal whitespace-pre-wrap">{CARD_POST_HISORY_INSTRUCTIONS}</p></svelte:fragment>
        </AccordionItem>
        {/if}
    </Accordion>
</div>
</div>

<style lang="postcss">

    .container-section {
        @apply w-full rounded variant-filled-surface p-6 h-full;
    }
</style>