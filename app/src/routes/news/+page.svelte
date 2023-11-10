<script>
       export let data;
</script>

{#each data.news as article}
   <h3>News Article :  {article.title}</h3>
{/each}

