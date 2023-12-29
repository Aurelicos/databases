<script lang="ts">
    import { browser } from "$app/environment";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let scrolled = false;
    if (browser) {
        window.addEventListener("scroll", () => {
            scrolled = window.scrollY > 0;
        });
    }
</script>

<nav
    class:scrolled
    class="w-full h-20 flex items-center justify-around absolute transition-all duration-300"
>
    <div class="flex items-center">
        <a
            href="/"
            on:click={(e) => {
                e.preventDefault();
                dispatch("scrollHome");
            }}
        >
            <img src="/svg/db.svg" alt="logo" class="h-14" />
        </a>
        <a
            href="/"
            class="sm:block hidden"
            on:click={(e) => {
                e.preventDefault();
                dispatch("scrollHome");
            }}
        >
            <h3 class="ml-6 text-lg font-medium">DB Showcase</h3>
        </a>
    </div>

    <div class="flex gap-6">
        <a
            href="/"
            on:click={(e) => {
                e.preventDefault();
                dispatch("scrollHome");
            }}>Home</a
        >
        <a
            href="/"
            on:click={(e) => {
                e.preventDefault();
                dispatch("scrollSQL");
            }}>SQL</a
        >
        <a
            href="/"
            on:click={(e) => {
                e.preventDefault();
                dispatch("scrollNoSQL");
            }}>NoSQL</a
        >
    </div>
</nav>

<style lang="postcss">
    a {
        @apply text-[#ffffffbf];
    }
    a:hover {
        @apply text-white;
    }
    .scrolled {
        @apply shadow-md bg-[#111111cc] backdrop-blur-md fixed z-50;
    }
</style>
