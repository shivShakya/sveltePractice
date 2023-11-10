// export const load = () ={}
import { fail } from '@sveltejs/kit';


export const actions = {
       login : async ({request , cookies}) => {
              const data = await request.formData();
              const username = data.get('username');
              const passsword = data.get('password');

              if(!username || !passsword){
                  return fail(400, {
                       username,
                       message : 'Missing username or password'
                  })
              }
              cookies.set('username' , username , {path : '/'});
              return {message : 'Logged in'};
       },

       register : async ({request , cookies}) => {
        const data = await request.formData();
        const username = data.get('username');
        const passsword = data.get('password');

        if(!username || !passsword){
             return {
                   message : "Mising username and password"
             };
        }
        cookies.set('username' , username , {path : '/'});
        return {message : 'Register Successfully'};
 }

       
}