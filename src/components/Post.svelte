<script>
    import { fly } from "svelte/transition";
    export let post;
</script> 

<svelte:head>
    <title>{post.title}</title>
    <link rel="stylesheet" href="/monokai.css">
    <meta name="Description" content="{post.description}">
</svelte:head>

<div class="blog-post">
    <div
        class="columns is-mobile is-centered">
        <div 
            class="column is-full-mobile is-three-quarters-tablet is-half-desktop"
            in:fly="{{x: -60, duration: 500}}"
        >
            <section>
                <header>
                    <div class="has-text-centered">
                       <h1> {post.title} </h1>
                    </div>
                    <span class="createdAt">{post.createdAt}</span>
                </header>
                <article>
                    {@html post.html}
                </article>
            </section>
        </div>
    </div>
</div>