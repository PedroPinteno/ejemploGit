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
            <ul class="submenu">
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
        <ul class="menu">
          ${menuHtml.join('')}
        </ul>
      </nav>
    `;

    const menuItems = document.querySelectorAll('.menu > li');
    menuItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const submenu = item.querySelector('.submenu');
        if (submenu) {
          submenu.style.display = 'block';
        }
      });

      item.addEventListener('mouseleave', () => {
        const submenu = item.querySelector('.submenu');
        if (submenu) {
          submenu.style.display = 'none';
        }
      });
    });

    // Agregar eventos a los submenús
    const submenus = document.querySelectorAll('.submenu');
    submenus.forEach(submenu => {
      const submenuItems = submenu.querySelectorAll('li');
      submenuItems.forEach(submenuItem => {
        submenuItem.addEventListener('mouseenter', () => {
          const subsubmenu = submenuItem.querySelector('.submenu');
          if (subsubmenu) {
            subsubmenu.style.display = 'block';
          }
        });

        submenuItem.addEventListener('mouseleave', () => {
          const subsubmenu = submenuItem.querySelector('.submenu');
          if (subsubmenu) {
            subsubmenu.style.display = 'none';
          }
        });
      });
    });
  })
  .catch(error => console.error('Error cargando el menú:', error));