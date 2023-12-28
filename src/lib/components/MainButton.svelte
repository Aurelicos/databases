<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let text: string;
</script>

<button
    class="text-[1.3rem] font-semibold flex items-center hover-effect relative"
    on:click={() => dispatch("click")}
    >{text}
    <span class="arrow-container inline-flex items-center ml-3">
        <span class="arrow-tail"></span>
        <span class="border-r-2 border-b-2 border-white p-[4px] -rotate-[45deg]"
        ></span>
    </span>
</button>

<style>
    .hover-effect::after {
        @apply content-[''] absolute left-0 bottom-[-8px] h-[2px] w-full bg-white origin-bottom-left transition-transform ease-in-out scale-x-0;
    }

    .hover-effect:hover::after {
        @apply scale-x-100;
    }

    .hover-effect:hover .arrow-tail {
        @apply w-[15px];
    }

    .arrow-container {
        @apply inline-flex items-center h-[10px];
    }

    .arrow-tail {
        @apply inline-block w-0 h-[2px] bg-white transition-all duration-300 -mr-[9px];
    }
</style>
