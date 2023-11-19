<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('click');
    }

    export let icon: string;
    export let bg_color : string;
    export let text: string

    
</script>

<button class="btn bg-[#{bg_color}] flex gap-2" on:click={handleClick} style="background-color: #{bg_color};"><img src={icon} alt="{text} Icon" class="h-7"> {text}</button> 