<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
</script>

<div class="h-screen flex items-center justify-center">
    <div class="flex justify-center h-full items-center">
        <div class="flex-col h-1/2 items-center mr-20 sm:flex hidden">
            <div
                class="w-[3px] h-full"
                style="background: linear-gradient(#7C72FF, #2DA44E 80%, #3FB950);"
            ></div>
            <img src="/svg/db.svg" alt="db" class="h-8 my-4" />
            <div
                class="w-[3px] h-full"
                style="background: linear-gradient(transparent, #7C72FF 30%)"
            ></div>
        </div>

        <div class="flex justify-start items-start flex-col relative px-4">
            <h1 class="sm:text-[5.5rem] text-[4rem] font-medium">Databases Showcase</h1>
            <p class="text-[#848d97] sm:text-2xl text-xl">
                The most used types of databases in the world!
            </p>
            <div>
                <button
                    on:click={() => dispatch("continue")}
                    class="px-4 rounded-lg bg-transparent border border-[#bc8cff] h-12 text-lg my-10 sm:my-20 flex items-center justify-center hover-effect"
                >
                    Continue
                    <span class="arrow-container inline-flex items-center ml-3">
                        <span class="arrow-tail"></span>
                        <span
                            class="border-r-2 border-b-2 border-white p-[3px] -rotate-[45deg]"
                        ></span>
                    </span>
                </button>
            </div>
            <p class="text-[#6e7681] text-xl">
                Currently displayed databases ↘︎
            </p>
            <div class="icons flex gap-20 h-20 mt-6 w-full">
                <a href="/">
                    <img src="/svg/firebase.svg" alt="firebase" />
                </a>
                <a href="/">
                    <img src="/svg/mongo.svg" alt="mongo" />
                </a>
                <a href="/">
                    <img src="/svg/mysql.svg" alt="mysql" />
                </a>
                <a href="/">
                    <img src="/svg/postgresql.svg" alt="postgresql" />
                </a>
            </div>
        </div>
    </div>
</div>

<style>
    button {
        @apply transition-all duration-300 flex items-center justify-center;
    }
    button:hover {
        @apply border-white;
    }
    .icons img {
        @apply h-20;
    }
    a {
        @apply opacity-60;
    }
    a:hover {
        @apply opacity-100 cursor-pointer;
    }

    .hover-effect:hover .arrow-tail {
        @apply w-[10px];
    }

    .arrow-container {
        @apply inline-flex items-center h-[10px];
    }

    .arrow-tail {
        @apply inline-block w-0 h-[2px] bg-white transition-all duration-300 -mr-[7px];
    }
</style>
