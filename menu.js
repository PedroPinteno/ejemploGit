fetch('menu.json')
  .then(response => response.json())
  .then(data => {
    const menuContainer = document.getElementById('menu-container');
    const menuHtml = [];

    function generarMenu(item) {
      const menuItemHtml = `
        <li>
          <a href="${item.url}">${item.nombre}</a>
          ${item.submenus ? `
            <ul>
              ${item.submenus.map(subitem => generarMenu(subitem)).join('')}
            </ul>
          ` : ''}
        </li>
      `;
      return menuItemHtml;
    }

    data.forEach(item => {
      menuHtml.push(generarMenu(item));
    });

    menuContainer.innerHTML = `
      <nav>
        <ul>
          ${menuHtml.join('')}
        </ul>
      </nav>
    `;
  })
  .catch(error => console.error('Error cargando el menú:', error));