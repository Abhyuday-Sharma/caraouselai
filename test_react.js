import React from 'react';
import ReactDOMServer from 'react-dom/server';
import DashboardPage from './src/pages/DashboardPage.jsx';

try {
  const html = ReactDOMServer.renderToString(React.createElement(DashboardPage));
  console.log("Rendered successfully!", html.slice(0, 100));
} catch (e) {
  console.error("REACT CRASH:", e);
}
