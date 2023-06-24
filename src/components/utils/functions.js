

function changeWidthDinamically(e) {
    e.target.style.width = `${(e.target.value.length) * 10}px`;
  }

  export default changeWidthDinamically;