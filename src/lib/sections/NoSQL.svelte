<script>
    import MainButton from "$lib/components/MainButton.svelte";
    import NoSqlShowcase from "$lib/components/NoSQLShowcase.svelte";
    import tilt from "../../utils/tilt";
</script>

<div class="w-full flex flex-col items-center justify-center pb-20">
    <div class="w-4/5">
        <div class="flex justify-start font-medium">
            <div class="flex flex-col">
                <div
                    class="h-48 w-[3px] ml-4"
                    style="background: linear-gradient(transparent, #33B3AE 40%);"
                ></div>
                <div class="flex items-center relative">
                    <img src="/svg/mongo.svg" class="w-8 my-4" alt="mongo" />
                    <h2 class="ml-12 text-[1.4rem] font-normal absolute">
                        MongoDB
                    </h2>
                </div>
                <div
                    class="h-1/2 w-[3px] ml-4"
                    style="background: linear-gradient(rgb(51, 179, 174) 40%, transparent);"
                ></div>
            </div>

            <div class="mt-64 w-full ml-4">
                <h1 class="text-[3.25rem] w-1/2 text-[#33b3ae]">
                    NoSQL Databases
                </h1>
                <h1 class="text-[3.25rem] mb-6 w-1/2">
                    Scaling Beyond Traditional Boundaries
                </h1>
            </div>
        </div>
        <div class="w-full flex justify-center gap-10">
            <div
                use:tilt={{ duration: 100, max: 3 }}
                class="w-1/2 border border-[#30363d] bg-[#11171e] px-20 py-16 rounded-3xl flex flex-col gap-10 overflow-hidden"
            >
                <div class="flex flex-col justify-between">
                    <p class="text-[#848d97] text-[1.3rem] font-medium">
                        <span class="text-white font-semibold">NoSQL</span> databases
                        represent a shift from traditional relational database structures,
                        offering flexibility, scalability, and high performance for
                        modern applications. Designed to handle a vast array of data
                        types, from structured to semi-structured and unstructured
                        data, NoSQL databases excel in environments where data requirements
                        are continuously evolving.
                    </p>
                    <div class="my-10">
                        <MainButton text={"Discover NoSQL Databases"} />
                    </div>
                </div>
                <img
                    src="/png/nosql.png"
                    alt="logo"
                    class="translate-x-20 translate-y-[7rem] rounded-tl-3xl rounded-br-3xl border border-[#30363d] opacity-80 shadow-2xl"
                />
            </div>
            <div
                use:tilt={{ duration: 100, max: 3 }}
                class="w-1/2 border border-[#30363d] bg-[#11171e] px-20 py-16 rounded-3xl flex flex-col gap-10 overflow-hidden"
            >
                <p class="text-[#848d97] text-[1.3rem] font-medium">
                    <span class="text-white font-semibold"
                        >Schema-less Design:</span
                    >
                    NoSQL databases allow for dynamic data models, making them ideal
                    for rapidly changing data formats.
                    <br />
                    <span class="text-white font-semibold">Scalability:</span>
                    Excelling in horizontal scaling, they offer solutions for handling
                    massive volumes of data across distributed systems.<br />
                    <span class="text-white font-semibold"
                        >Variety of Data Models:</span
                    >
                    Catering to specific needs, NoSQL encompasses document, key-value,
                    graph, and column-family databases.<br /><span
                        class="text-white font-semibold">High-Performance:</span
                    > Optimized for quick data retrieval and handling large-scale
                    data operations, making them a go-to choice for big data and
                    real-time web applications.
                </p>
                <img
                    src="/png/nosql2.png"
                    alt="logo"
                    class="translate-y-16 rounded-t-3xl border border-[#30363d] opacity-80 shadow-2xl"
                />
            </div>
        </div>
        <div class="flex">
            <div
                class="h-[22rem] w-[3px] ml-4"
                style="background: linear-gradient(transparent, #F778BA, #F778BA, transparent);"
            ></div>
            <div class="ml-12 mt-20 font-medium">
                <h1 class="text-[3.25rem] w-1/2 text-[#f778ba]">
                    MongoDB
                </h1>
                <h1 class="text-[3.25rem] mb-6 w-1/2">
                    The Dynamic Choice in NoSQL Databases
                </h1>
            </div>
        </div>
        <div>
            <NoSqlShowcase name={"nosql"} />
        </div>
    </div>
</div>
