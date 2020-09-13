import { htmlToElement } from '../utils';

export function Title() {
  return htmlToElement(
    `<h2 class="title">Share <strong>Board name</strong> with others</h2>`
  );
}
