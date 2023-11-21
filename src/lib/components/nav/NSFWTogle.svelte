<script lang="ts">
    import { SearchFilterStore } from "$lib/stores/SearchFilter";
    import { SlideToggle } from "@skeletonlabs/skeleton";

    function VerifyTags() {
        if ($SearchFilterStore.nsfw_only === true && $SearchFilterStore.nsfw === false) {
            console.warn("NSFW Only is true, but NSFW is false. Setting NSFW Only to false.");
            $SearchFilterStore.nsfw_only = false;
        }
    }

</script>
<SlideToggle name="NSFWToggle" active="bg-primary-500" bind:checked={$SearchFilterStore.nsfw} on:change={VerifyTags}><span class="font-bold">NSFW</span></SlideToggle>