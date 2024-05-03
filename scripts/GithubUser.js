// Classe que irá conectar a API e pegar os dados dos usuários GITHUB
class GithubUser {
   static async search(username) {
      const endpoint = `https://api.github.com/users/${username}`;
      
      try {
         return fetch(endpoint)
         .then(data => data.json())
         .then(({login, name, public_repos, followers}) => ({
            login,
            name,
            public_repos,
            followers,
         }));
      } catch (error) {
         console.error(`Failed to fetch ${error}`);
      };
   };
};

// EXPORTS
export { GithubUser };