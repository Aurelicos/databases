<script lang="ts">
    import atomOneDark from "svelte-highlight/styles/atom-one-dark";
    import Radio from "./Radio.svelte";
    import { onMount } from "svelte";
    import { sql } from "../constants/code";

    export let name: string;

    let selected = "0";

    const changed = async ({ detail }: any) => {
        selected = detail;
        data = [];
        const response = await fetch(`api/mysql?action=${selected}`);
        if (response.ok) {
            data = await response.json();
            if (data.length > 0) {
                headers = Object.keys(data[0]);
            }
        } else {
            console.error("Error fetching data:", response.statusText);
        }
    };
    let data: any[] = [];
    let headers: any[] = [];

    onMount(async () => {
        try {
            const response = await fetch("/api/mysql");
            if (response.ok) {
                data = await response.json();
                if (data.length > 0) {
                    headers = Object.keys(data[0]);
                }
            } else {
                console.error("Error fetching data:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

    let currentButton = "query";

    function selectButton(button: string) {
        currentButton = button;
    }
</script>

<svelte:head>
    {@html atomOneDark}
</svelte:head>

<div
    class="w-full border border-[#30363d] bg-[#11171e] px-20 py-16 rounded-3xl flex justify-between gap-20"
>
    <div class="w-1/2 overflow-y-scroll overflow-x-scroll {currentButton === "query" ? "max-h-96" : "max-h-[45rem]"}">
        {#if data.length === 0}
            <div class="col-span-full flex justify-center items-center w-full">
                <div class="loading" />
            </div>
        {:else}
            <table class="w-full border-collapse">
                <thead>
                    <tr>
                        {#each headers as header}
                            <th>{header}</th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each data as row}
                        <tr>
                            {#each headers as header}
                                <td>{row[header]}</td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
    <div class="flex flex-col justify-start items-start gap-6">
        <div class="button-container transition-all duration-300">
            <div class="flex relative">
                <button
                    on:click={() => selectButton("query")}
                    class:selected={currentButton === "query"}
                >
                    query
                </button>
                <button
                    on:click={() => selectButton("js")}
                    class:selected={currentButton === "js"}
                >
                    js
                </button>
                <div class="underline" class:selected={currentButton} />
            </div>
        </div>
        <Radio
            {name}
            code={currentButton === "query" ? sql.query : sql.js}
            {selected}
            on:changed={changed}
            value={"0"}
        />
        <Radio
            {name}
            code={currentButton === "query" ? sql.query1 : sql.js1}
            {selected}
            on:changed={changed}
            value={"1"}
        />
        <Radio
            {name}
            code={currentButton === "query" ? sql.query2 : sql.js2}
            {selected}
            on:changed={changed}
            value={"2"}
        />
    </div>
</div>

<style>
    .loading {
        @apply border-[4px] border-[#ffffff] border-t-[4px] border-t-[#00271E];
        @apply rounded-[50%] w-24 h-24 animate-spin;
    }
    th,
    td {
        @apply border border-[#ddd] p-2;
    }
    th {
        @apply bg-[#050505];
    }
    button {
        @apply bg-transparent py-2 rounded-lg w-20 transition-all duration-300;
    }
    button.selected {
        @apply bg-[#ffffff05];
    }
    .button-container .underline {
        @apply bg-slate-300 absolute h-[2px] bottom-0 w-20 left-0 transition-all duration-300;
    }
    .button-container button.selected + .underline {
        @apply left-1/2;
    }
</style>
