async function fetchRepos() {
    try {
      const response = await fetch(
        "https://api.github.com/users/IlRando/repos"
      );

      // Check if the API limit has been reached
      const remaining = response.headers.get('X-RateLimit-Remaining');
      const repoCardsContainer = document.getElementById("repo-cards");

      if (remaining === '0') {
        const resetTime = new Date(response.headers.get('X-RateLimit-Reset') * 1000);
        const message = document.createElement("p");
        message.className = "column subtitle is-full has-text-centered";
        message.textContent = `API rate limit reached, repos will not be shown. Please try again at ${resetTime.toLocaleString()}.`;
        repoCardsContainer.appendChild(message);
        return;
      }

      const repos = await response.json();

      for (const repo of repos) {
        const languagesResponse = await fetch(repo.languages_url);
        const languages = await languagesResponse.json();
        const languagesList =
          Object.keys(languages).join(", ") || "Languages not specified";

        const card = document.createElement("div");
        card.className = "column is-one-quarter hidden-card";

        card.innerHTML = `
          <a href="${repo.html_url}" target="_blank" class="card-link">
            <div class="card has-text-centered">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="${repo.html_url}/raw/main/Cover.png" alt="${
          repo.name
        } Cover Image" />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">${repo.name}</p>
                    <p class="subtitle is-6">${languagesList}</p>
                  </div>
                </div>
                <div class="content">
                  ${repo.description || "No description available."}
                </div>
                <div class="stats">
                  ⭐ Stars: ${repo.stargazers_count} | 🍴 Forks: ${
          repo.forks_count
        }
                </div>
              </div>
            </div>
          </a>
        `;

        repoCardsContainer.appendChild(card);
      }

      // Set up Intersection Observer for repo cards
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.remove('hidden-card');
              entry.target.classList.add('animate__animated', 'animate__fadeInUp');
              observer.unobserve(entry.target);
            }, index * 100); // Delay of 100ms between each card
          }
        });
      }, observerOptions);

      const cards = repoCardsContainer.querySelectorAll('.column');
      cards.forEach(card => {
        observer.observe(card);
      });

    } catch (error) {
      console.error("Error fetching repos:", error);
    }
  }

  fetchRepos();

  function typewriterEffect(element, text, speed) {
    let index = 0;
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    element.appendChild(cursor);

    function type() {
      if (index < text.length) {
        element.insertBefore(document.createTextNode(text.charAt(index)), cursor);
        index++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const titleElement = document.querySelector(".typewriter-title");
    const titleText = "Bienvenido a RandoMike";
    typewriterEffect(titleElement, titleText, 80); // Adjust speed as needed
  });

  document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
      root: null, // Use the viewport as the container
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeInLeft');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(element => {
      observer.observe(element);
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.remove('hidden-icon');
            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            observer.unobserve(entry.target);

            // Remove animation classes after 1 second
            setTimeout(() => {
              entry.target.classList.remove('animate__animated', 'animate__fadeInUp');
            }, 1000);

          }, index * 150);
        }
      });
    }, observerOptions);

    const icons = document.querySelectorAll('.hoverable-image.hidden-icon');
    icons.forEach(icon => {
      observer.observe(icon);
    });
  });

  window.onload = function() {
    window.scrollTo(0, 0);
  }