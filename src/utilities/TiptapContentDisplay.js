import { domToReact } from "html-react-parser";

const options = {
    replace: (domNode) => {
      if (domNode.name === 'blockquote') {
        return (
          <blockquote style={{ borderLeft: '3px solid #a16207', marginBottom: '1rem', paddingLeft: '1rem' }}>
            {domToReact(domNode.children)}
          </blockquote>
        );
      }
      if (domNode.name === 'pre') {
        return (
          <pre style={{ background: 'var(--code-background)', borderRadius: '0.5rem', color: 'white', margin: '1.5rem 0', padding: '0.75rem 1rem' }}>
            {domToReact(domNode.children)}
          </pre>
        );
      }
      if (domNode.name === 'code') {
        return (
          <code style={{ backgroundColor: 'var(--code-background)', borderRadius: '0.4rem', color: 'white', fontSize: '0.85rem', padding: '0.25em 0.3em' }}>
            {domToReact(domNode.children)}
          </code>
        );
      }
      if (domNode.name === 'h1') {
        return (
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1, margin: '1rem 0' }}>
            {domToReact(domNode.children)}
          </h1>
        );
      }
      if (domNode.name === 'h2') {
        return (
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, lineHeight: 1.1, margin: '1rem 0' }}>
            {domToReact(domNode.children)}
          </h2>
        );
      }
      if (domNode.name === 'p') {
        return (
          <p style={{ margin: '1rem 0' }}>
            {domToReact(domNode.children)}
          </p>
        );
      }
      if (domNode.name === 'ul') {
        return (
          <ul style={{ padding: '0 1rem', margin: '1.25rem 1rem 1.25rem 0.4rem', listStyleType: 'disc' }}>
            {domToReact(domNode.children)}
          </ul>
        );
      }
      if (domNode.name === 'ol') {
        return (
          <ol style={{ padding: '0 1rem', margin: '1.25rem 1rem 1.25rem 0.4rem', listStyleType: 'decimal-leading-zero' }}>
            {domToReact(domNode.children)}
          </ol>
        );
      }
      if (domNode.name === 'li') {
        return (
          <li style={{ margin: '0.25em 0' }}>
            {domToReact(domNode.children)}
          </li>
        );
      }
      if (domNode.name === 'img') {
        return (
          <img
            src={domNode.attribs.src}
            alt={domNode.attribs.alt || ''}
            style={{ display: 'block', height: 'auto', margin: '1.5rem 0', maxWidth: '100%' }}
          />
        );
      }
      // Handle links
      if (domNode.name === 'a') {
        return (
          <a
            href={domNode.attribs.href}
            style={{ cursor: 'pointer', textDecoration: 'underline', color: '#f4a320' }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#6969ec')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#f4a320')}
          >
            {domToReact(domNode.children)}
          </a>
        );
      }

      // Fallback to default rendering for other nodes
      return domToReact(domNode.children);
    },
};

export default options