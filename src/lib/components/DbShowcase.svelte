<script lang="ts">
    import Highlight from "svelte-highlight";
    import typescript from "svelte-highlight/languages/typescript";
    import atomOneDark from "svelte-highlight/styles/atom-one-dark";
    import Radio from "./Radio.svelte";

    let code = `const add = (a: number, b: number) => a + b;`;
    let selected = "add";

    const changed = ({ detail }: any) => {
        selected = detail;
    };
</script>

<svelte:head>
    {@html atomOneDark}
</svelte:head>

<div
    class="w-full border border-[#30363d] bg-[#11171e] px-20 py-16 rounded-3xl flex mb-32 justify-between"
>
    <div class="h-96 w-1/2 bg-yellow-700"></div>
    <div class="flex flex-col justify-start items-center gap-6">
        <Radio {code} {selected} on:changed={changed} value={"1"} />
        <Radio {code} {selected} on:changed={changed} value={"2"} />
        <Radio {code} {selected} on:changed={changed} value={"3"} />
    </div>
</div>