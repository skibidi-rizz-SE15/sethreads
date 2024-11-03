import { domToReact } from "html-react-parser";
import 'highlight.js/styles/github.css';

const options = {
    replace: (domNode) => {
      if (domNode.name === 'blockquote') {
        return (
          <blockquote style={{ borderLeft: '3px solid #a16207', marginBottom: '1rem', paddingLeft: '1rem' }}>
            {domToReact(domNode.children)}
          </blockquote>
        );
      }
      else if (domNode.name === 'h1') {
        return (
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1, margin: '1rem 0' }}>
            {domToReact(domNode.children)}
          </h1>
        );
      }
      else if (domNode.name === 'h2') {
        return (
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, lineHeight: 1.1, margin: '1rem 0' }}>
            {domToReact(domNode.children)}
          </h2>
        );
      }
      else if (domNode.name === 'ul') {
        return (
          <ul style={{ padding: '0 1rem', margin: '1.25rem 1rem 1.25rem 0.4rem', listStyleType: 'disc' }}>
            {domToReact(domNode.children)}
          </ul>
        );
      }
      else if (domNode.name === 'ol') {
        return (
          <ol style={{ padding: '0 1rem', margin: '1.25rem 1rem 1.25rem 0.4rem', listStyleType: 'decimal-leading-zero' }}>
            {domToReact(domNode.children)}
          </ol>
        );
      }
      else if (domNode.name === 'li') {
        return (
          <li style={{ margin: '0.25em 0' }}>
            {domToReact(domNode.children)}
          </li>
        );
      }
      else if (domNode.name === 'img') {
        return (
          <img
            src={domNode.attribs.src}
            alt={domNode.attribs.alt || ''}
            style={{ display: 'block', height: 'auto', margin: '1.5rem 0', maxWidth: '100%' }}
          />
        );
      }
      // Handle links
      else if (domNode.name === 'a') {
        return (
          <a
            href={domNode.attribs.href}
            style={{ cursor: 'pointer', textDecoration: 'underline', color: '#f4a320' }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#6969ec')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#f4a320')}
            target="_blank"
          >
            {domToReact(domNode.children)}
          </a>
        );
      }

      else if (domNode.name === 'p') {
        return (
          <p style={{ margin: '1rem 0' }}>
            {domToReact(domNode.children, options)}
          </p>
        );
      }

      // Fallback to default rendering for other nodes
      return domToReact(domNode);
    }
  };

export default options