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
      
      document.getElementById('nameError').textContent = '';
      document.getElementById('emailError').textContent = '';
      document.getElementById('successMessage').textContent = '';
  
      var formData = {
          name: document.getElementById('name').value.trim(),
          email: document.getElementById('email').value.trim(),
          company: document.getElementById('company').value.trim(),
          phone: document.getElementById('phone').value.trim(),
          message: document.getElementById('message').value.trim()
      };
  
      let isValid = true;
  
      if (formData.name === '') {
          document.getElementById('nameError').textContent = 'Name is required.';
          isValid = false;
      }
  
      if (formData.email === '') {
          document.getElementById('emailError').textContent = 'Email is required.';
          isValid = false;
      } else if (!validateEmail(formData.email)) {
          document.getElementById('emailError').textContent = 'Invalid email format.';
          isValid = false;
      }
  
      if (isValid) {
        
        console.log(formData);
        
        var successMessage = document.getElementById('successMessage');
        successMessage.textContent = 'Your data has been sent successfully!';
        
        successMessage.classList.add('show');
        
        document.getElementById('contactForm').reset();
        
        setTimeout(function() {
            successMessage.classList.remove('show');
            setTimeout(function() {
                successMessage.textContent = '';
            }, 1000); 
        }, 5000);
    }});
  
  function validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailPattern.test(email);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const productContainer = document.getElementById('product-container');
  const loadMoreButton = document.getElementById('load-more');

  const additionalProducts = [
    {
      imgSrc: 'pics/CloudsBed.jpg',
      productName: 'In the Clouds Bed',
      price: '$499.99',
      productLink: 'product.html'
    },
    {
      imgSrc: 'pics/FlowerishBookshelf.jpg',
      productName: 'Flowerish Bookshelf',
      price: '$59.99',
      productLink: 'product.html'
    },
    {
      imgSrc: 'pics/mirror.jpg',
      productName: 'Unique Mirror',
      price: '$29.99',
      productLink: 'product.html'
    },
    {
      imgSrc: 'pics/swingChair.jpg',
      productName: 'Swing Chair',
      price: '$79.99',
      productLink: 'product.html'
    },
  ];

  function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'top-cart-item-desc';

    const productLink = document.createElement('a');
    productLink.href = product.productLink;

    const productImage = document.createElement('img');
    productImage.src = product.imgSrc;
    productImage.alt = product.altText;
    productImage.className = 'product-image';

    const productDetails = document.createElement('div');
    productDetails.className = 'product-details';

    const productName = document.createElement('p');
    productName.textContent = product.productName;

    const productPrice = document.createElement('span');
    productPrice.className = 'top-cart-item-price d-block';
    productPrice.textContent = product.price;

    productDetails.appendChild(productName);
    productDetails.appendChild(productPrice);
    productLink.appendChild(productImage);
    productLink.appendChild(productDetails);
    productDiv.appendChild(productLink);

    return productDiv;
  }

  function handleLoadMoreClick() {
    const newRow = document.createElement('div');
    newRow.className = 'products';

    additionalProducts.forEach(product => {
      const productElement = createProductElement(product);
      newRow.appendChild(productElement);
    });

    productContainer.parentNode.appendChild(newRow);


    loadMoreButton.removeEventListener('click', handleLoadMoreClick);
    loadMoreButton.disabled = true;
  }

  loadMoreButton.addEventListener('click', handleLoadMoreClick);
});



document.addEventListener('DOMContentLoaded', function() {
  const productImages = document.querySelectorAll('.top-cart-item-desc img');
  function handleMouseOver() {
      this.style.filter = 'grayscale(0%)';
      this.style.transition = 'filter 0.3s ease';
  }

  function handleMouseOut() {
      this.style.filter = 'grayscale(100%)';
  }

  productImages.forEach(image => {
      image.addEventListener('mouseover', handleMouseOver);
      image.addEventListener('mouseout', handleMouseOut);
  });
});

document.addEventListener('DOMContentLoaded', function() {

  let currentIndex = 0;
  const items = document.querySelectorAll('.carousel-item');
  const totalItems = items.length;

  const updateCarousel = (index) => {
      items.forEach((item, i) => {
          item.classList.remove('active');
          if (i === index) {
              item.classList.add('active');
          }
      });
  };

  document.querySelector('.carousel-button.next').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel(currentIndex);
  });

  document.querySelector('.carousel-button.prev').addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel(currentIndex);
  });

  setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel(currentIndex);
  }, 3000); 

  updateCarousel(currentIndex);
});


let mybutton = document.getElementById("btn-back-to-top");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.classList.add("show");
    } else {
        mybutton.classList.remove("show");
    }
}

mybutton.addEventListener("click", function() {
    scrollToTop();
});

function scrollToTop() {
    const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 8);
        }
    };
    scrollToTop();
}

const apiUrl = 'https://picsum.photos/v2/list?page=1&limit=10';

async function fetchImages() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}
function displayImages(images) {
  const productContainer = document.getElementById('product-container');
  let index = 0;

  images?.slice(0,4)?.forEach(image => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('top-cart-item-desc');

      const productLink = document.createElement('a');
      productLink.href = 'product.html';

      const productImage = document.createElement('img');
      productImage.src = image.download_url; 
      productImage.alt = image.author;
      productImage.classList.add('product-image');

      if (index % 2 === 1) {
          productImage.classList.add('even');
      }

      const productDetails = document.createElement('div');
      productDetails.classList.add('product-details');

      const productName = document.createElement('p');
      productName.textContent = image.author; 

      const productPrice = document.createElement('span');
      productPrice.classList.add('top-cart-item-price', 'd-block');
      productPrice.textContent = '$39.99';

      productDetails.appendChild(productName);
      productDetails.appendChild(productPrice);
      productLink.appendChild(productImage);
      productLink.appendChild(productDetails);
      productDiv.appendChild(productLink);

      productContainer.appendChild(productDiv);

      index++;
  });
}

document.addEventListener('DOMContentLoaded', async () => {
    const images = await fetchImages();
    displayImages(images);
});



class TeamMember {
  constructor(name, role, imageSrc) {
      this.name = name;
      this.role = role;
      this.imageSrc = imageSrc;
  }

  generateHTML() {
      return `
      <div class="col-lg-3 col-md-6 mb-4">
          <div class="top-cart-item-desc">
              <a href="team-member.html">
                  <img src="${this.imageSrc}" alt="${this.name}" class="product-image2" />
                  <div class="product-details">
                      <p>${this.name}</p>
                      <span class="top-cart-item-price d-block">${this.role}</span>
                  </div>
              </a>
          </div>
      </div>
      `;
  }
}

class Team {
  constructor() {
      this.members = [];
  }

  addMember(member) {
      this.members.push(member);
  }

  renderTeam(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      container.innerHTML = '';

      let row1 = '<div class="row mb-4">';
      let row2 = '<div class="row mb-4">';

      this.members.forEach((member, index) => {
          const memberHTML = member.generateHTML();

          if (index < 4) {
              row1 += memberHTML; 
          } else {
              row2 += memberHTML;
          }
      });

      row1 += '</div>';
      row2 += '</div>';

      container.innerHTML = row1 + row2;
  }
}

const jessie = new TeamMember('Jessie Smith', 'Manager', 'pics/team2.jpg');
const jon = new TeamMember('Jon Ndoe', 'Assistant', 'pics/team.jpg');
const sam = new TeamMember('Sam Holand', 'Salesman', 'pics/team3.jpg');
const emmy = new TeamMember('Emmy Roman', 'Customer Service Manager', 'pics/team4.jpg');
const michael = new TeamMember('Michael Lee', 'Product Designer', 'pics/team5.jpg');
const olivia = new TeamMember('Olivia Taylor', 'Quality Control Manager', 'pics/team6.jpg');
const daniel = new TeamMember('Daniel Chen', 'E-commerce Manager', 'pics/team7.jpg');
const sophia = new TeamMember('Sophia Ramirez', 'Retail Manager', 'pics/team8.jpg');

const ourTeam = new Team();

ourTeam.addMember(jessie);
ourTeam.addMember(jon);
ourTeam.addMember(sam);
ourTeam.addMember(emmy);
ourTeam.addMember(michael);
ourTeam.addMember(olivia);
ourTeam.addMember(daniel);
ourTeam.addMember(sophia);

ourTeam.renderTeam('team-members-container');


  const welcomeMessageDiv = document.getElementById('welcome-message');
  const now = new Date();
  const hours = now.getHours();

  let timeBasedMessage;
  if (hours >= 5 && hours < 12) {
    timeBasedMessage = 'Good Morning';
  } else if (hours >= 12 && hours < 18) {
    timeBasedMessage = 'Good Afternoon';
  } else if (hours >= 18 && hours < 24) {
    timeBasedMessage = 'Good Evening';
  } else {
    timeBasedMessage = 'Hello';
  }

  const userName = localStorage.getItem('userName');
  if (userName) {
    welcomeMessageDiv.textContent = `${timeBasedMessage}, ${userName}!`;
  } else {
    welcomeMessageDiv.textContent = `${timeBasedMessage}!`;
  }

  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const companyInput = document.getElementById('company');
  const phoneInput = document.getElementById('phone');
  const messageInput = document.getElementById('message');

  const subscribeForm = document.getElementById('subscribeForm');
  const emailSubscribeInput = document.getElementById('emailS');

  nameInput.value = localStorage.getItem('name') || '';
  emailInput.value = localStorage.getItem('email') || '';
  companyInput.value = localStorage.getItem('company') || '';
  phoneInput.value = localStorage.getItem('phone') || '';
  messageInput.value = localStorage.getItem('message') || '';
  emailSubscribeInput.value = localStorage.getItem('emailS') || '';

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem('name', nameInput.value);
    localStorage.setItem('email', emailInput.value);
    localStorage.setItem('company', companyInput.value);
    localStorage.setItem('phone', phoneInput.value);
    localStorage.setItem('message', messageInput.value);
    localStorage.setItem('userName', nameInput.value);
    // document.getElementById('successMessage').textContent = 'Form data saved!';
  });

  subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem('emailS', emailSubscribeInput.value);
    alert('Subscription email saved!');
  });


function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
      }
  }
  return "";
}
document.addEventListener("DOMContentLoaded", function() {
  const subscribeForm = document.getElementById('subscribeForm');
  const emailSubscribeInput = document.getElementById('emailS');

  emailSubscribeInput.value = getCookie('subscriptionEmail') || '';

  subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailSubscribeInput.value.trim();

      if (email !== '') {
          setCookie('subscriptionEmail', email, 30);

          setCookie('newsletterConsent', 'true', 30);

          alert('Subscription email saved!');
      } else {
          alert('Please enter a valid email address.');
      }
  });

  subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailSubscribeInput.value.trim();

      const consentGiven = getCookie('newsletterConsent');
      if (consentGiven !== 'true') {
          alert('Please consent to our newsletter subscription policy.');
          return;
      }

      if (email !== '') {
          setCookie('subscriptionEmail', email, 30);

          alert('Subscription email saved!');
      } else {
          alert('Please enter a valid email address.');
      }
  });

});
