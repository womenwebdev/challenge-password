class PasswordRevealer {
  element = "";
  eyeEl;
  strengthEl;
  prContainer;
  errorMessage = "You must pass and ID in the constructor";

  constructor(inputId) {
    if (!inputId) {
      throw new Error(this.errorMessage);
    }
    this.getElement(inputId);
    this.build();
    this.strength();
    this.showPassword();
  }

  getElement(inputId) {
    this.element = document.getElementById(inputId);

    if (this.element === null) {
      throw new Error("Element not found.");
    } else if (this.element.nodeName !== "INPUT") {
      throw new Error("Element is not an Input.");
    }
  }

  build() {
    this.prContainer = document.createElement("div");
    this.element.parentNode.insertBefore(
      this.prContainer,
      this.element.nextSibling
    );
    this.prContainer.className = "pr-container";
    this.element.className = "pr-password";
    this.prContainer.appendChild(this.element);

    this.eyeEl = document.createElement("i");
    this.eyeEl.className = "fas fa-eye-slash pr-eye";
    this.eyeEl.id = "prEye";
    this.prContainer.appendChild(this.eyeEl);

    this.strengthEl = document.createElement("i");
    this.strengthEl.className = "pr-strength";
    this.strengthEl.id = "prStrength";
    this.prContainer.appendChild(this.strengthEl);
  }

  strength() {
    const input = this.element;
    let strength = this.strengthEl;

    input.addEventListener("keyup", function() {
      let length = input.value.length;
      let styleColor = "";
      let className = "";

      if (length <= 3) {
        className = "far fa-frown pr-strength";
        styleColor = "red";
      } else if (length >= 4 && length <= 6) {
        className = "far fa-meh pr-strength";
        styleColor = "orange";
      } else if (length > 6) {
        className = "far fa-smile pr-strength";
        styleColor = "green";
      }

      strength.className = className;
      strength.style.color = styleColor;
    });
  }

  showPassword() {
    const input = this.element;
    let eye = this.eyeEl;

    eye.addEventListener("click", function() {
      if (input.type === "password") {
        eye.classList.remove("fa-eye-slash");
        eye.classList.add("fa-eye");
        input.type = "text";
      } else {
        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");
        input.type = "password";
      }
    });
  }
}
