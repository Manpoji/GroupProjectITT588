class Footer extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
      /* Footer Styles */
      /* Footer Styles */
        footer {
          box-shadow: 0 -2px 8px 2px rgba(0, 0, 0, 0.1);
          margin-top: auto;
        }

        footer .footer {
          background-color: #efefef;
          padding: 35px;
          text-align: center;
        }

        footer .footer:first-child {
          padding: 10px;
          background-color: #2ab860;
        }

        :host-context(body.deuteranopia) footer .footer:first-child {
          background-color: #ffbf00;
        }
      </style>
      
      <footer>
        <div class="footer"></div>
        <div class="footer">
          <p>&copy; <b><span id="year"></span></b> iZakat. All Rights Reserved.</p>
        </div>
      </footer>
    `;

    // Set the year correctly
    this.updateYear();
  }

  updateYear() {
    const yearElement = this.shadowRoot.getElementById("year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
}

// Define the custom element
customElements.define("footer-component", Footer);
