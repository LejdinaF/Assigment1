document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    menuToggle.addEventListener("click", function() {
      navMenu.classList.toggle("show");
    });

    window.addEventListener("resize", function() {
      if (window.innerWidth >= 769) {
        navMenu.classList.remove("show");
      }
    });

    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();
        var formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          company: document.getElementById('company').value,
          phone: document.getElementById('phone').value,
          message: document.getElementById('message').value
        };
        console.log(formData);
        contactForm.reset();
      });
      document.getElementById('subscribeForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var emailSInput = document.getElementById('emailS').value;
        if (emailSInput.trim() !== '') {
          var formData = {
            emails: emailSInput
          };
          console.log('Form Data:');
          console.log(formData);
        } else {
          console.log('Email field is empty. Please provide an email address.');
        }
        subscribeForm.reset();
      });
  })
