<script>
    import { createEventDispatcher } from "svelte";
    import MainButton from "$lib/components/MainButton.svelte";
    import DbShowcase from "$lib/components/SQLShowcase.svelte";
    import tilt from "../../utils/tilt";

    const dispatch = createEventDispatcher();

    export let sql;
    export let sql_showcase;
</script>

<div class="flex justify-center flex-col items-center">
    <div class="flex justify-start xl:w-4/5 w-[90%] flex-col items-center">
        <h1 class="sm:text-[3.25rem] text-[2.5rem] mb-6">
            <span class="text-[#3fb950]">SQL Databases</span>: The Backbone of
            Data Management.
        </h1>

        <div
            use:tilt={{ duration: 100, max: 4 }}
            bind:this={sql}
            class="flex justify-between bg-[#11171e] border border-[#30363d] px-8 py-10 sm:px-20 sm:py-16 rounded-3xl xl:flex-row flex-col items-center"
        >
            <div class="xl:w-1/2 flex flex-col justify-between">
                <p class="text-[#848d97] text-[1.3rem] font-medium">
                    <span class="text-white font-semibold">SQL databases</span>,
                    standing for Structured Query Language databases, are the
                    cornerstone of modern data management and storage. Renowned
                    for their robust structure, they organize data into
                    well-defined tables, columns, and rows, enabling efficient
                    storage, retrieval, and manipulation of data. This
                    relational model ensures data integrity and consistency,
                    making SQL databases an ideal choice for applications
                    requiring precise and complex data operations.
                </p>
                <div>
                    <MainButton
                        text={"Discover SQL Databases"}
                        on:click={() => dispatch("discover_sql")}
                    />
                </div>
            </div>

            <img
                src="/png/sql.png"
                alt="logo"
                class="xl:w-1/2 xl:m-0 mt-20 xl:translate-x-20 xl:rounded-tl-3xl xl:rounded-br-3xl xl:translate-y-16 border border-[#30363d] opacity-80 shadow-2xl"
            />
        </div>
        <div
            class="h-36 w-[3px]"
            style="background: linear-gradient(rgb(63, 185, 80), rgb(46, 160, 67), transparent);"
        ></div>
        <div
            class="w-full flex flex-col justify-center items-center"
            bind:this={sql_showcase}
        >
            <h1 class="sm:text-[3.25rem] text-[2.5rem] mb-6 text-[#2ea043] font-semibold">
                <span class="text-white">MySQL:</span> A Popular Open-Source Database
            </h1>
            <DbShowcase name={"mysql"} />
        </div>
    </div>
</div>
