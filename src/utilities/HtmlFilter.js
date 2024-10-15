function getPreviewHTMLString(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const elements = Array.from(doc.body.childNodes);

  let foundImgTag = false;
  let foundParagraphTag = false;
  let imgTagHtml = '';
  let paragraphContent = '';
  let firstElementHtml = '';

  elements.forEach(element => {
    if (element.tagName === 'IMG' && !foundImgTag) {
      foundImgTag = true;
      imgTagHtml = element.outerHTML;
    } else if (element.tagName === 'P' && !foundParagraphTag) {
      foundParagraphTag = true;
      paragraphContent = element.innerHTML;
    }

    // Capture the first element if we haven't already
    if (!firstElementHtml && (element.nodeType === Node.ELEMENT_NODE || (element.nodeType === Node.TEXT_NODE && element.textContent.trim()))) {
      firstElementHtml = element.outerHTML || `<p>${element.textContent.trim()}</p>`;
    }
  });

  if (foundImgTag) {
    return imgTagHtml;
  } else if (foundParagraphTag) {
    return `<p>${paragraphContent}...</p>`;
  } else if (!foundParagraphTag) {
    const codeBlocks = doc.querySelectorAll('pre > code');
    if (codeBlocks.length > 0) {
      return `<p>&lt;/&gt;</p>`;
    }
  } 
  else {
    return firstElementHtml || ''; // Return the first element or empty string if no content found
  }
}

export { getPreviewHTMLString }
