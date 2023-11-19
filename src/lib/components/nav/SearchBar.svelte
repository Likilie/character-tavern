<script lang="ts">
    import { SearchFilterStore } from "$lib/stores/SearchFilter";
    import { page } from '$app/stores';
    import { goto } from "$app/navigation";


    let SearchInput: string = $SearchFilterStore.search ?? "";

    function Search() {
        $SearchFilterStore.search = SearchInput;
        if ($page.url.pathname !== "/character/catalog") {
            goto("/character/catalog");
        }
    }

</script>

<form class="input-group input-group-divider grid-cols-[1fr_auto]">
    <input type="text" placeholder="Search by name, tags, description..." bind:value={SearchInput} />
    <button class="variant-filled-primary" on:click={Search}><i class="fa-solid fa-magnifying-glass"></i></button>
</form>