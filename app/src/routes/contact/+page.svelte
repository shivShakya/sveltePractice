<script>
       let name = '';

       export const snapshot = {
            capture: () =>{
                     return { name }
            },

            restore: (data) => {
                   name = data.name
            }
       }
</script>


<form method="post">
      <input placeholder="Name" type="text" name="Name" bind:value={name} />
      <button type="Submit">Submit</button>
     <a href="/">Cancel</a>
</form>