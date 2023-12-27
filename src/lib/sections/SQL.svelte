<script>
    import DbShowcase from "$lib/components/SQLShowcase.svelte";
    import tilt from "../../utils/tilt";
</script>

<div class="flex justify-center flex-col items-center">
    <div class="flex justify-start w-4/5 flex-col items-center">
        <h1 class="text-[3.25rem] mb-6">
            <span class="text-[#3fb950]">SQL Databases</span>: The Backbone of
            Data Management.
        </h1>

        <div
            use:tilt={{ duration: 100, max: 4 }}
            class="flex justify-between bg-[#11171e] border border-[#30363d] px-20 py-16 rounded-3xl"
        >
            <div class="w-1/2 flex flex-col justify-between">
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
                    <button
                        class="text-[1.3rem] font-semibold flex items-center hover-effect relative"
                        >Discover SQL Databases
                        <span
                            class="arrow-container inline-flex items-center ml-3"
                        >
                            <span class="arrow-tail"></span>
                            <span
                                class="border-r-2 border-b-2 border-white p-[4px] -rotate-[45deg]"
                            ></span>
                        </span>
                    </button>
                </div>
            </div>

            <img
                src="/png/sql.png"
                alt="logo"
                class="w-1/2 translate-x-20 rounded-tl-3xl rounded-br-3xl translate-y-16 border border-[#30363d] opacity-80 shadow-2xl"
            />
        </div>
        <div
            class="h-36 w-[3px]"
            style="background: linear-gradient(rgb(63, 185, 80), rgb(46, 160, 67), transparent);"
        ></div>
        <h1 class="text-[3.25rem] mb-6 text-[#2ea043] font-semibold">
            <span class="text-white">MySQL:</span> A Popular Open-Source Database
        </h1>
        <DbShowcase name={"mysql"} />
    </div>
</div>

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
