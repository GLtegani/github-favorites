// IMPORTS
import { GithubUser } from "./GithubUser.js";

// Classe que vai conter a lógica dos dados e como serão estruturados
class Favorites {
   constructor(root) {
      this.root = document.querySelector(root);
      this.load();
   };

   load() {
      this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || [];
   };

   async add(username) {
      try {
         const userExists = this.entries.find(entry => String(entry.login).toLowerCase() === username.toLowerCase());
         if(userExists) {
            throw new Error('User already registered');
         };

         const user = await GithubUser.search(username);

         if(user.login === undefined) {
            throw new Error('User not found');
         };

         this.entries = [user, ...this.entries];
         this.update();
         this.save();
      } catch (error) {
         alert(error.message);
      };
   };

   save() {
      localStorage.setItem('@github-favorites:', JSON.stringify(this.entries));
   };

   delete(user) {
      const filteredEntries = this.entries.filter(entry => entry.login !== user.login);
      this.entries = filteredEntries;
      this.update();
      this.save();
   };
};

// Classe que vai criar a visualização e eventos do HTML
class FavoritesView extends Favorites {
   constructor(root) {
      super(root);
      
      this.tbody = this.root.querySelector('table tbody');

      this.update();
      this.onadd();
   };

   onadd() {
      const addBtn = this.root.querySelector('.search button');
      
      addBtn.onclick = (event) => {
         event.preventDefault();
         const {value} = this.root.querySelector('.search input');

         this.add(value);
      };
   };

   update() {
      this.removeAllTr();

      this.entries.forEach(user => {
         const row = this.createRow();
         row.querySelector('.user img').src = `https://github.com/${user.login}.png`;
         row.querySelector('.user a').href = `https://github.com/${user.login}`;
         row.querySelector('.user img').alt = `${user.name} image`;
         row.querySelector('.user p').textContent = user.name;
         row.querySelector('.user span').textContent = user.login;
         row.querySelector('.repositories').textContent = user.public_repos;
         row.querySelector('.followers').textContent = user.followers;
         row.querySelector('.remove').onclick = () => {
            const isOk = confirm('Tem certeza que deseja remover o usuário?');

            if(isOk) {
               this.delete(user);
            }
         };

         this.tbody.append(row);
      });
   };

   createRow() {

      const trGithub = document.createElement('tr');
      trGithub.innerHTML = `
         <td class="user">
            <img src="" alt="">
            <a href="" target="_blank">
               <p></p>
               <span></span>
            </a>
         </td>
         <td class="repositories">
            
         </td>
         <td class="followers">
            
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
      this.tbody.querySelectorAll('tr').forEach((tr) => {tr.remove()});
   };
};

// EXPORTS
export { FavoritesView };