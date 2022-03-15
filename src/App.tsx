import { render } from 'solid-js/web';
import type { Component } from 'solid-js';

const App: Component = () => {
  return <div>Learn Solid Demo!</div>;
};

render(() => <App />, document.getElementById('root') as HTMLElement);
