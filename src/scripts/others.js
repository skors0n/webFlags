export function showButtonBackOnScroll() {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 120) {
      document.querySelector(".buttonBack").classList.add("visible");
    } else {
      document.querySelector(".buttonBack").classList.remove("visible");
    }
  });
}

export function changeTheme() {
  let currentTheme = "dark";

  if (currentTheme === "dark") currentTheme = "light";

  document.querySelector(".nightMode").addEventListener("click", () => {
    document.querySelector("body").classList.toggle("lightMode");
  });
}
