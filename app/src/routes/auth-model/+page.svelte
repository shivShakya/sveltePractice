<script>
    export let form 
</script>

<form method="POST" action="/auth?/login">
     <input type="text" name="username" placeholder="Username" />
     <input type="password" name="password" placeholder="Password" />
     <button type="submit">Login</button>
     <button formaction ="?/register">Register</button>
</form>

<p>{form?.message || ''}</p>