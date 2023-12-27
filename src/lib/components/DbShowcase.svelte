<script lang="ts">
    import atomOneDark from "svelte-highlight/styles/atom-one-dark";
    import Radio from "./Radio.svelte";
    import { onMount } from "svelte";

    let code = `const pool = mysql.createPool({
    host: 'localhost',
    user: 'myuser',
    database: 'mydatabase',
    password: 'mypassword'
});

app.get('/data', (req, res) => {
    pool.query('SELECT * FROM my_table', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});`;
    let selected = "add";

    const changed = ({ detail }: any) => {
        selected = detail;
    };
    let data: any[] = [];

    onMount(async () => {
        const response = await fetch("/api/mysql");
        if (response.ok) {
            data = await response.json();
        }
    });
</script>

<svelte:head>
    {@html atomOneDark}
</svelte:head>

<div
    class="w-full border border-[#30363d] bg-[#11171e] px-20 py-16 rounded-3xl flex mb-32 justify-between"
>
    <div class="w-1/2">
        {#if data.length === 0}
            <div
                class="col-span-full flex justify-center items-center w-full h-screen"
            >
                <div class="loading" />
            </div>
        {:else}
            {#each data as row}
                <p>{JSON.stringify(row)}</p>
            {/each}
        {/if}
    </div>
    <div class="flex flex-col justify-start items-center gap-6">
        <Radio {code} {selected} on:changed={changed} value={"1"} />
        <Radio {code} {selected} on:changed={changed} value={"2"} />
        <Radio {code} {selected} on:changed={changed} value={"3"} />
    </div>
</div>

<style>
    .loading {
        @apply border-[4px] border-[#ffffff] border-t-[4px] border-t-[#00271E];
        @apply rounded-[50%] w-24 h-24 animate-spin;
    }
</style>
