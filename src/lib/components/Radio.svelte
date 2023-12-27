<script lang="ts">
    import Highlight from "svelte-highlight";
    import typescript from "svelte-highlight/languages/typescript";
    import atomOneDark from "svelte-highlight/styles/atom-one-dark";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let code: string;
    export let selected: string;
    export let value: string;
</script>

<svelte:head>
    {@html atomOneDark}
</svelte:head>

<label
    class="flex justify-between bg-[#282c34] rounded-lg pr-2 py-1 cursor-pointer"
    class:selected={selected === value}
>
    <div class="pl-6 pr-2 flex items-center relative">
        <input
            type="radio"
            name="operation"
            {value}
            on:change={(event) => dispatch("changed", event.currentTarget.value)}
            checked={selected === value}
            class="radio opacity-0 absolute -z-[1]"
        />
        <div class="radio-overlay">
            <div class="radio-inner"></div>
        </div>
    </div>
    <Highlight language={typescript} {code} />
</label>

<style>
    label {
        @apply border-2 border-transparent;
    }
    .selected {
        @apply border-2 border-[#2f363e];
    }
    .radio-overlay {
        @apply w-4 h-4 bg-white rounded-[50%] absolute top-1/2 -translate-y-1/2 left-4;
        @apply flex items-center justify-center;
    }
    .radio-inner {
        @apply w-[10px] h-[10px] bg-transparent rounded-[50%] transition-colors duration-300;
    }
    .radio:checked + .radio-overlay .radio-inner {
        @apply bg-[#753fc7];
    }
</style>
