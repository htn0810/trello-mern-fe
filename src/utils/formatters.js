export const interceptorLoadingElements = (calling) => {
  // DOM get all elements in current page which className is 'interceptor-loading'
  const elements = document.querySelectorAll(".interceptor-loading");
  for (let i = 0; i < elements.length; i++) {
    if (calling) {
      // If element is waiting call API (calling = true), we will blur it and prevent click by css
      elements[i].style.opacity = "0.5";
      elements[i].style.pointerEvents = "none";
    } else {
      // If element is not waiting call API, we not action
      elements[i].style.opacity = "initial";
      elements[i].style.pointerEvents = "initial";
    }
  }
};

export const capitalizeFirstLetter = (val) => {
  if (!val) return "";
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};
