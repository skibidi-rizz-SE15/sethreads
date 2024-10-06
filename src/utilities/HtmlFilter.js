function getPreviewHTMLString(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
  
    const elements = Array.from(doc.body.childNodes);
  
    let foundImgTag = false;
    let imgTagHtml = '';
  
    for (let i = 0; i < elements.length && i < 5; i++) {
      const element = elements[i];
  
      if (element.tagName === 'IMG') {
        foundImgTag = true;
        imgTagHtml = element.outerHTML;
        break;
      }
    }
  
    if (foundImgTag) {
      return imgTagHtml;
    } else {
      const imgTags = doc.querySelectorAll('img');
      imgTags.forEach(img => img.remove());
      return doc.body.innerHTML;
    }
}

export { getPreviewHTMLString }