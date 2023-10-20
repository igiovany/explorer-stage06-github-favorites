// classe que vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = [
      {
        login: 'igiovany',
        name: 'Giovany',
        public_repos: '20',
        followers: '1'
      },
      {
        login: 'diego3g',
        name: 'Diego',
        public_repos: '76',
        followers: '250'
      }
    ]
  }

  delete(user) {
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login)

    this.entries = filteredEntries
    this.update()
  }

}

// classe que vai criar a visualização e enventos do HTML
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
  }

  update() {
    this.removeAllTr()

    this.entries.forEach(user => {
      const row = this.createRow()
      
      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers


      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Deseja deletar essa linha?')
        
        if(isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })


  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td class="user">
        <img src="https://github.com/igiovany.png" alt="Imagem de Giovany">
        <a href="https://github.com/igiovany" target="_blank">
          <p>Giovany</p>
          <span>igiovany</span>
        </a>
      </td>
      <td class="repositories">
        20
      </td>
      <td class="followers">
        1
      </td>
      <td>
        <button class="remove">&times;</button>
      </td>
    `

    return tr

  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove()
    })
  }
}