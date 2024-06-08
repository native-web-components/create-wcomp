import BaseComponent from "./BaseComponent";
class WebComponent extends BaseComponent {
  constructor() {
    super();
  }
  render() {
    super.render();

    let container = document.createElement("div");
    container.innerHTML = `<div>Your Web Component is PROJECT_NAME</div>`;
    this.shadowRoot!.appendChild(container);
  }
}

const define = (name: string, options?: ElementDefinitionOptions) => {
  customElements.define(name, WebComponent, options);
};

export { define };
