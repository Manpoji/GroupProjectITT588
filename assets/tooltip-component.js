class TooltipZakat extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const tooltipText = this.innerHTML.trim(); // Get the content inside the tag
        shadow.innerHTML = `
            <style>
            .tooltip-zakat {
                display: inline-block;
                margin-left: 5px;
                vertical-align: middle; 
                position: relative;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                padding: 5px;
                color: #fff;
                background-color:rgba(0, 0, 0, 0.8);
                font-size: 14px;
                text-align: center;
                font-weight: bold;
            }

            .tooltip-zakat .tooltiptext {
                visibility: hidden;
                font-size: 14px;
                font-weight: normal;
                width: 300px;
                background-color: rgba(233, 233, 233, 0.9); /* Light grey with 80% opacity */
                color: #000000; /* Text remains fully visible */
                border-radius: 6px;
                padding: 3px;
                position: absolute;
                margin-left: 10px;
                z-index: 1000;
            }

            .tooltip-zakat:hover .tooltiptext {
                visibility: visible;
            }
            </style>
            <div class="tooltip-zakat">?
                <span class="tooltiptext">${tooltipText}</span>
            </div>
        `;
    }
}

customElements.define('tooltip-zakat', TooltipZakat);