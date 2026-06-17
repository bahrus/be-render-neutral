# be-render-neutral

Provide base abstract class for different rendering libraries, including [be-alit](https://github.com/bahrus/be-alit), [be-fasting](https://github.com/bahrus/be-fasting) [TODO], [be-preactive](https://github.com/bahrus/be-preactive)[TODO] and [be-hyping](https://github.com/bahrus/be-hyping) [TODO].

Each of the libraries linked to above adds the ability to enhance the script element, so that the content inside the script element gets rendered inside the parent element containing the script element.

This package provides the common logic that all those enhancements share.

## Viewing Locally

Any web server that serves static files with server-side includes will do but...

1. Install git
2. Fork/clone this repo
3. Install node.js
4. Open command window to folder where you cloned this repo
5. > git submodule add https://github.com/bahrus/types.git types
6. > git submodule update --init --recursive
7. > npm install
8. > npm run serve
9. Open http://localhost:8000/demo/ in a modern browser