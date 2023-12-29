<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import Intro from "$lib/sections/Intro.svelte";
    import SQL from "$lib/sections/SQL.svelte";
    import NoSQL from "$lib/sections/NoSQL.svelte";
    import Footer from "$lib/sections/Footer.svelte";

    let intro: HTMLDivElement;
    let sql: HTMLDivElement;
    let sql_showcase: HTMLDivElement;
    let nosql: HTMLDivElement;
    let mongo: HTMLDivElement;

    function scroll(section: HTMLDivElement, home = false, scrollToTop = false) {
        if (home) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } else if (scrollToTop) {
            const rect = section.getBoundingClientRect();
            const top = window.scrollY + rect.top;
            window.scrollTo({
                top: top,
                behavior: "smooth",
            });
        } else {
            const rect = section.getBoundingClientRect();
            const top =
                window.scrollY +
                rect.top -
                window.innerHeight / 2 +
                section.clientHeight / 2;
            window.scrollTo({
                top: top,
                behavior: "smooth",
            });
        }
    }
</script>

<Header
    on:scrollHome={() => scroll(intro, true)}
    on:scrollSQL={() => scroll(sql)}
    on:scrollNoSQL={() => scroll(nosql, false, true)}
/>

<div bind:this={intro}>
    <Intro on:continue={() => scroll(sql)} />
</div>

<div>
    <SQL
        bind:sql
        bind:sql_showcase
        on:discover_sql={() => scroll(sql_showcase)}
    />
</div>
<div bind:this={nosql}>
    <NoSQL bind:mongo on:discover_nosql={() => scroll(mongo)} />
</div>
<div>
    <Footer />
</div>
