<script>
    import NoSqlShowcase from "$lib/components/NoSQLShowcase.svelte";
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
                class="w-1/2 border border-[#30363d] bg-[#11171e] px-20 py-16 rounded-3xl flex justify-between gap-20"
            ></div>
            <div
                class="w-1/2 border border-[#30363d] bg-[#11171e] px-20 py-16 rounded-3xl flex justify-between gap-20"
            ></div>
        </div>
        
        <div>
            <NoSqlShowcase />
        </div>
    </div>
</div>
