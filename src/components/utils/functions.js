

function changeWidthDinamically(e) {
    e.target.style.width = `${(e.target.value.length + 1) * 8}px`;
  }

  export default changeWidthDinamically;