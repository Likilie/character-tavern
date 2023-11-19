<script lang="ts">
    import { GetTags } from "$lib/functions/api/get_tags";
    import { SearchFilterStore } from "$lib/stores/SearchFilter";
    import { SearchSort } from "$lib/type";
    import { InputChip, RadioGroup, RadioItem, type AutocompleteOption, Autocomplete } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    onMount(() => {
        GetTags().then((Tags) => {
            let i = 0;
            for (const tag of Tags) {
                const option: AutocompleteOption<string> = {label: `${tag.name} (${tag.non_private_projects_count})`,value: tag.name};
                tagOptions = [...tagOptions, option];
                if (i >= 250) {
                    break;
                }
                i++;
            }
        });
    });


    function onTagSection(event: CustomEvent<AutocompleteOption<string>>): void {
        if (event.detail.value === null) return;
        if ($SearchFilterStore.tags && $SearchFilterStore.tags.includes(event.detail.value)) {
            RemoveTag(event.detail.value);
            return;
        }
        if ($SearchFilterStore.tags) {
            $SearchFilterStore.tags = [...$SearchFilterStore.tags, event.detail.value];
        } else {
            $SearchFilterStore.tags = [event.detail.value];
        }
    }

    function RemoveTag(Tag: string): void {
        if ($SearchFilterStore.tags) {
            $SearchFilterStore.tags = $SearchFilterStore.tags.filter((tag) => tag !== Tag);
        }
    }
				

    let tagOptions: AutocompleteOption<string>[] = [];

    let RequiredTags: string;
    let isRequiredTagInputFocused = false;
					
</script>

<section class="md:col-span-2 lg:col-span-1 space-y-6">
    <h2 class="text-3xl font-bold">Filter</h2>
    <div class="container rounded variant-filled-surface px-2 py-4">
        <label class="label">
            <h2 class="part-title">Sort By</h2>
            <select class="select" bind:value={$SearchFilterStore.sort}>
                <option value={SearchSort.download_count}> Most Popular (All Time) </option>
                <option value={SearchSort.trending_downloads}> Trending (7D) </option>
                <option value={SearchSort.rating}> Most Rated </option>
                <option value={SearchSort.rating_count}> Number of Ratings</option>
                <option value={SearchSort.created_at}> Creation Date </option>
                <option value={SearchSort.n_tokens}> Number of Tokens </option>               
                <option value={SearchSort.random}> Random </option>
            </select>
        </label>
        <RadioGroup>
            <RadioItem bind:group={$SearchFilterStore.asc} name="ASC" value={true}><i class="fa-solid fa-arrow-up-short-wide"></i> ASC</RadioItem>
            <RadioItem bind:group={$SearchFilterStore.asc} name="DESC" value={false}><i class="fa-solid fa-arrow-down-short-wide"></i> DSC</RadioItem>
        </RadioGroup>
    </div>
    <div class="container rounded variant-filled-surface px-2 py-4 space-y-4">
        <h3 class="part-title">Tags & Tokens</h3>
        <label class="label flex flex-col gap-1" for="Allow_Tags">
            <span>Required Tags (Case Sensitive)</span>
            <input class="input" type="text" name="REQUIRE_TAGS" id="Allow_Tags" placeholder="Romance ↲ Sadistic ↲" bind:value={RequiredTags}   on:focus={() => isRequiredTagInputFocused = true}>
            {#if isRequiredTagInputFocused}
            <div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
                <Autocomplete bind:input={RequiredTags} options={tagOptions} on:selection={onTagSection} denylist={$SearchFilterStore.tags ?? []} />
            </div>
            {/if}
            {#if $SearchFilterStore.tags}<span class=" flex flex-wrap gap-2">{#each $SearchFilterStore.tags as Tag} <button class="chip variant-filled flex justify-center items-center gap-1" on:click={() => RemoveTag(Tag)}><span>{Tag} </span><i class="fa-solid fa-xmark"></i></button> {/each}</span>{/if}
        </label>
        <label class="label" for="Allow_Tags">
            <span>Excluded Tags (Case Sensitive)</span>
            <InputChip name="Exclude_Tags" id="Exclude_Tags" bind:value={$SearchFilterStore.exclude_tags} allowUpperCase placeholder="Loli ↲ Fetish ↲" />
        </label>
        <label class="label">
            <span>Token Minimum</span>
            <input class="input" title="Minimal Tokens" type="number" placeholder="Min. tokens" bind:value={$SearchFilterStore.min_tokens} />
        </label>
        <label class="label">
            <span>Token Maximum</span>
            <input class="input" title="Maximum Tokens" type="number" placeholder="Max. tokens" bind:value={$SearchFilterStore.max_tokens} />
        </label>
    </div>
    <div class="container rounded variant-filled-surface px-2 py-4 space-y-4">
        <h3 class="part-title">Options</h3>
        <div class="space-y-2">
            {#if $SearchFilterStore.nsfw}
                <label class="flex items-center space-x-2">
                    <input class="checkbox" type="checkbox" name="NSFW_ONLY" bind:checked={$SearchFilterStore.nsfw_only} />
                    <p>🔞 Only NSFW Cards</p>
                </label>
            {/if}
            <label class="flex items-center space-x-2">
                <input class="checkbox" type="checkbox" name="REQUIRE_EXPRESSION_PACK" bind:checked={$SearchFilterStore.require_expressions} />
                <p>😍 Require Expression Pack</p>
            </label>
            <label class="flex items-center space-x-2">
                <input class="checkbox" type="checkbox" name="REQUIRE_LOREBOOK" bind:checked={$SearchFilterStore.require_lore}/>
                <p>📚 Require Lorebook</p>
            </label>
        </div>
    </div>
</section>

<style scoped lang="postcss">
    .part-title {
        @apply text-2xl font-bold;
    }
</style>