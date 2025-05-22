document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbarContainer");
  const formMessage = document.getElementById("formMessage");
  const contactForm = document.getElementById("contactForm");


  function handleWindowResize() {
    if (window.innerWidth < 992) {
      navbar.style.opacity = "";
      navbar.style.background = "";
      document.removeEventListener("scroll", handlePageScroll);
    } else {
      handlePageScroll();
      document.addEventListener("scroll", handlePageScroll);
    }
  }

  function handlePageScroll() {
    if (window.scrollY > 0) {
      navbar.style.opacity = "";
      navbar.style.background = "";
    } else {
      navbar.style.opacity = "1";
      navbar.style.background = "transparent";
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    formMessage.style.display = "none";
    formMessage.innerText = "";

    const data = Object.fromEntries(new FormData(e.target).entries());

    if (!validateInput(data)) {
      formMessage.innerText = "*Semua field harus terisi";
      formMessage.style.display = "block";
      return;
    }


    const a = document.createElement("a");
    const { name, email, phone, subject, message } = data;
    const body = `${message}\n\nFrom:\n${name}\n${email}\n${phone}`.replaceAll(
      "\n",
      "%0D%0A",
    );
    a.href = `mailto:hbrs@yopmail.com?subject=${subject}&body=${body}`;
    a.click();
    a.remove();
  }

  function validateInput(input) {
    return !Object.values(input).some((val) => val.trim() == "");
  }

  handleWindowResize();

  window.addEventListener("resize", handleWindowResize);
  contactForm.addEventListener("submit", handleFormSubmit);
});
