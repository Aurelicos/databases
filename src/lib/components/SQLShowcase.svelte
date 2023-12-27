<script lang="ts">
    import atomOneDark from "svelte-highlight/styles/atom-one-dark";
    import Radio from "./Radio.svelte";
    import { onMount } from "svelte";

    export let name: string;

    let code = `await connection.execute('SELECT * FROM showcase');        `;

    let code1 = `const name = \`User_\${Math.floor(Math.random() * 1000)}\`;   
const email = \`\${name}@example.com\`;                       
query = 'INSERT INTO showcase (name, email) VALUES (?, ?)';
await connection.execute(query, [name, email]);            `;

    let code2 = `query = 'DELETE FROM showcase ORDER BY id DESC LIMIT 1';   
await connection.execute(query);                           `;

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
</script>

<svelte:head>
    {@html atomOneDark}
</svelte:head>

<div
    class="w-full border border-[#30363d] bg-[#11171e] px-20 py-16 rounded-3xl flex justify-between gap-20"
>
    <div class="w-1/2 overflow-y-scroll overflow-x-scroll max-h-96">
        {#if data.length === 0}
            <div
                class="col-span-full flex justify-center items-center w-full"
            >
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
        <Radio {name} {code} {selected} on:changed={changed} value={"0"} />
        <Radio {name} code={code1} {selected} on:changed={changed} value={"1"} />
        <Radio {name} code={code2} {selected} on:changed={changed} value={"2"} />
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
</style>
