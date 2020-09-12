const template = `
  <section class="email-input__card">
      <div class="email-input__body">
        <h2 class="email-input__title">
          Share <strong>Board name</strong> with others
        </h2>
        <div class="email-input__emails">
           <span class="email-tag">
            <span class="email-tag__text">
              raul@gmail.com
            </span>
            <span class="email-tag__close-button">
              <svg width="8" height="8" fill="none">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 .8L7.2 0 4 3.2.8 0 0 .8 3.2 4 0 7.2l.8.8L4 4.8 7.2 8l.8-.8L4.8 4 8 .8z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </span>
          <span class="email-tag invalid">
            <span class="email-tag__text">
              invalid.invalid
            </span>
            <span class="email-tag__close-button">
              <svg width="8" height="8" fill="none">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 .8L7.2 0 4 3.2.8 0 0 .8 3.2 4 0 7.2l.8.8L4 4.8 7.2 8l.8-.8L4.8 4 8 .8z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </span> 
          <input class="input" type="text" placeholder="add more people… " />
        </div>
      </div>
      <footer class="email-input__actions-container">
        <button class="email-input__button">Add email</button
        ><button class="email-input__button">Get emails count</button>
      </footer>
    </section> 
`;

function EmailsInput(node: HTMLElement) {
  node.innerHTML = template;
}

/* Needs to be default to be able to access globally */
export default EmailsInput;
