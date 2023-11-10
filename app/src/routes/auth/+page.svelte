<script>
     import { page } from '$app/stores'; 
      export let form;

      const redirectTo = $page.url.searchParams.get('redirectTo') || '/';
</script>

<form method="POST" action="?/login&redirectTo={redirectTo}">
       <input type="text" name="username" placeholder="Username" value={form?.username ?? ''}/>
       <input type="password" name="password" placeholder="Password" />
       <button type="submit">Login</button>
       <button formaction ="?/register">Register</button>
</form>

<p>{form?.message || ''}</p>