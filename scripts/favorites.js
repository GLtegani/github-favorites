class Favorites {
   constructor(root) {
      this.root = document.querySelector(root);
      this.load();
   };

   load() {
      this.entries = [
         {
            login: 'GLtegani',
            name: 'GLtegani',
            public_repos: '57',
            followers: '1',
         },

         {
            login: 'GLtegani',
            name: 'GLtegani',
            public_repos: '57',
            followers: '1',
         },
      ];
   };
};

class FavoritesView extends Favorites {
   constructor(root) {
      super(root);

      this.update();
   };

   update() {
      this.removeAllTr();

      entries.forEach(user => {
         console.log(user);
      });
   };

   createRow() {

      const trGithub = document.createElement('tr');
      trGithub.innerHTML = `
         <td class="user">
            <img src="https://github.com/GLtegani.png" alt="Gabriel Image">
            <a href="https://github.com/GLtegani" target="_blank">
               <p>Gabriel Tegani</p>
               <span>GLtegani</span>
            </a>
         </td>
         <td class="repositories">
            58
         </td>
         <td class="followers">
            1
         </td>
         <td>
            <button class="remove">
               &times;
            </button>
         </td>
      </tr>`;

      return trGithub;
   };

   removeAllTr() {
      const tbody = this.root.querySelector('table tbody');

      tbody.querySelectorAll('tr').forEach((tr) => {tr.remove()});
   };
};




// EXPORTS
export { FavoritesView };