class Header extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        header {
          box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.1);
        }

        header a{
          display: flex;
          justify-content: center;
          align-items:center;
          color: black;
          text-decoration: none;
          gap: 10px;
          border-radius: 5px;
        }

        header .navbar {
          background-color: #f1f1f1;
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        header .navbar:last-child {
          padding: 10px;
          background-color: var(--secondary-color, #2ab860);
        }

        :host-context(body.deuteranopia) .navbar:last-child {
          background-color: #ffbf00;
        }

        header .nav-logo {
          border-radius: 5px;
        }

        header .nav-logo img {
          object-fit: cover;
          height: 50px;
        }

        header .nav-logo:hover {
          background-color: #bdbdbd;
        }

        header .nav-menu {
          display: flex;
          gap: 15px;
        }

        header .nav-menu a.active {
          border-bottom: 3px solid var(--secondary-color, #2ab860);
          font-weight: bold;
        }

        :host-context(body.deuteranopia) .nav-menu a.active {
          border-bottom-color: #ffbf00;
        }

        header .nav-menu a:hover {
          border-bottom: 3px solid var(--secondary-color, #2ab860);
        }

        :host-context(body.deuteranopia) .nav-menu a:hover {
          border-bottom-color: #ffbf00;
        }

        header .burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
        }

        header .burger span {
          width: 25px;
          height: 3px;
          background-color: black;
          border-radius: 5px;
        }

        @media screen and (max-width: 768px) {
          header .nav-menu {
            display: none;
            flex-direction: column;
            width: 100%;
            background-color: #f1f1f1;
            position: absolute;
            top: 60px;
            left: 0;
            z-index: 1000;
          }

          header .nav-menu.show {
            display: flex;
            margin-top: 44px;
          }

          header .nav-menu a {
            padding: 10px;
            border-bottom: 1px solid #ddd;
          }

          header .burger {
            display: flex;
          }
        }
      </style>
      <header>
        <div class="navbar">
          <a href="./index.html" class="nav-logo">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Zm178-80h444-444Zm0 0h444L480-830 258-720Z"/></svg>
          <h2>iZakat</h2></a>
          <div class="nav-menu" id="navMenu">
            <a href="./index.html"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>Home</a>
            <a href="./about.html"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M484-80q-84 0-157.5-32t-128-86.5Q144-253 112-326.5T80-484q0-146 93-257.5T410-880q-18 99 11 193.5T521-521q71 71 165.5 100T880-410q-26 144-138 237T484-80Zm0-80q88 0 163-44t118-121q-86-8-163-43.5T464-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T160-484q0 135 94.5 229.5T484-160Zm-20-305Z"/></svg>About</a>
            <a href="./calculate.html"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M320-240h60v-80h80v-60h-80v-80h-60v80h-80v60h80v80Zm200-30h200v-60H520v60Zm0-100h200v-60H520v60Zm44-152 56-56 56 56 42-42-56-58 56-56-42-42-56 56-56-56-42 42 56 56-56 58 42 42Zm-314-70h200v-60H250v60Zm-50 472q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>Calculation</a>
            <a href="./contact.html" class="active"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v720q0 33-23.5 56.5T680-40H280Zm0-120v40h400v-40H280Zm0-80h400v-480H280v480Zm0-560h400v-40H280v40Zm0 0v-40 40Zm0 640v40-40Z"/></svg>Contact</a>
            
          </div>
          <div class="burger" id="burger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="navbar"></div>
      </header>
    `;

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Toggle mobile menu
    this.shadowRoot.getElementById("burger").addEventListener("click", () => {
      this.toggleMenu();
    });
  
    // Update active link on page load
    this.updateActiveNavLink();
  }
  

  toggleMenu() {
    const navMenu = this.shadowRoot.getElementById("navMenu");
    navMenu.classList.toggle("show");
  }

  updateActiveNavLink() {
    const navLinks = this.shadowRoot.querySelectorAll(".nav-menu a");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach((link) => {
      let linkPath = link.getAttribute("href").replace("./", "");
      if (linkPath === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
}

customElements.define("header-component", Header);