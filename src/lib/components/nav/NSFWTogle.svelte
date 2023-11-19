<script lang="ts">
    import { SearchFilterStore } from "$lib/stores/SearchFilter";


    import { SlideToggle } from "@skeletonlabs/skeleton";

</script>
<SlideToggle name="NSFWToggle" active="bg-primary-500" bind:checked={$SearchFilterStore.nsfw}><span class="font-bold">NSFW</span></SlideToggle>