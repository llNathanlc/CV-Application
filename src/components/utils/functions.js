function changeWidthDinamically(e) {
  e.target.style.width = `${(e.target.value.length + 1) * 7}px`;
}

export default changeWidthDinamically;
