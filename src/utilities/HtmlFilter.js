function getPreviewHTMLString(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Check for <pre><code> tags
  const codeBlocks = doc.querySelectorAll('pre > code');
  if (codeBlocks.length > 0) {
    return '<p>See thread to see the code</p>';
  }

  const elements = Array.from(doc.body.childNodes);

  let foundImgTag = false;
  let imgTagHtml = '';
  let paragraphContent = '';

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    if (element.tagName === 'IMG' && !foundImgTag) {
      foundImgTag = true;
      imgTagHtml = element.outerHTML;
    } else if (element.tagName === 'P' && !paragraphContent) {
      paragraphContent = element.innerHTML;
      break; // Stop after finding the first paragraph
    }
  }

  if (foundImgTag) {
    return imgTagHtml;
  } else if (paragraphContent) {
    return `<p>${paragraphContent}</p>`;
  } else {
    // If no image or paragraph found, return the first non-empty text node or element
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.nodeType === Node.TEXT_NODE && element.textContent.trim()) {
        return `<p>${element.textContent.trim()}</p>`;
      } else if (element.nodeType === Node.ELEMENT_NODE) {
        return element.outerHTML;
      }
    }
    return ''; // Return empty string if no content found
  }
}

export { getPreviewHTMLString }