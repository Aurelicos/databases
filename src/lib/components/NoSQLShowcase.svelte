<script lang="ts">
    import atomOneDark from "svelte-highlight/styles/atom-one-dark";
    import json from "svelte-highlight/languages/json";
    import Radio from "./Radio.svelte";
    import { onMount } from "svelte";
    import { Highlight } from "svelte-highlight";

    export let name: string;

    let code = `const finalRows = await collection.find().toArray();                      `;

    let code1 = `const name = \`User_\${Math.floor(Math.random() * 1000)}\`;                  
const email = \`\${name}@example.com\`;                                      
await collection.insertOne({ name, email });                              `;

    let code2 = `const lastDoc = await collection.find().sort({ _id: -1 }).limit(1).next();
if (lastDoc) {                                                            
    await collection.deleteOne({ _id: lastDoc._id });                     
}                                                                         `;

    let selected = "0";
    let jsonData = "";

    const changed = async ({ detail }: any) => {
        selected = detail;
        data = [];
        const response = await fetch(`api/mongodb?action=${selected}`);
        if (response.ok) {
            data = await response.json();
            if (data.length > 0) {
                jsonData = JSON.stringify(data, null, 2);
            }
        } else {
            console.error("Error fetching data:", response.statusText);
        }
    };
    let data: any[] = [];

    onMount(async () => {
        try {
            const response = await fetch("/api/mongodb");
            if (response.ok) {
                data = await response.json();
                if (data.length > 0) {
                    jsonData = JSON.stringify(data, null, 2);
                }
            } else {
                console.error("Error fetching data:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
</script>

<svelte:head>
    {@html atomOneDark}
</svelte:head>

<div
    class="w-full border border-[#30363d] bg-[#11171e] px-20 py-16 rounded-3xl flex justify-between gap-20"
>
    <div class="flex flex-col justify-start items-start gap-6">
        <Radio
            {name}
            {code}
            {selected}
            on:changed={changed}
            value={"0"}
            reversed={true}
        />
        <Radio
            {name}
            code={code1}
            reversed={true}
            {selected}
            on:changed={changed}
            value={"1"}
        />
        <Radio
            {name}
            code={code2}
            reversed={true}
            {selected}
            on:changed={changed}
            value={"2"}
        />
    </div>
    <div class="w-1/2 overflow-y-scroll overflow-x-scroll max-h-96">
        {#if jsonData}
            <Highlight language={json} code={jsonData} />
        {:else}
            <div class="col-span-full flex justify-center items-center w-full">
                <div class="loading" />
            </div>
        {/if}
    </div>
</div>

<style>
    .loading {
        @apply border-[4px] border-[#ffffff] border-t-[4px] border-t-[#00271E];
        @apply rounded-[50%] w-24 h-24 animate-spin;
    }
</style>
