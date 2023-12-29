<script lang="ts">
    import "../app.css";
    import { page } from "$app/stores";
</script>

<div
    class="cont text-mywhite flex items-center justify-center text-center w-full h-screen z-50 bg-blue-50"
>
    <div class="flex flex-col justify-between items-center">
        {#if $page.error}
            <h1 class="text-[4rem]">{$page.status} {$page.error.message}</h1>
        {/if}

        <h2 class="text-[20rem]">Jajx, there was an error!</h2>
        <button on:click={() => history.back()}>Go back</button>
    </div>
</div>

<style>
    h1 {
        @apply text-[4rem];
    }
    h2 {
        @apply text-2xl text-center;
    }
    .cont {
        @apply z-[100] bg-black h-screen absolute w-full;
    }
    button {
        @apply text-xl bg-blue-900 py-2 px-4 rounded-md mt-6;
    }
    button:hover {
        @apply bg-blue-800;
    }
</style>