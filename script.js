document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing envelope login...");

  initEnvelopeLogin();

  function initEnvelopeLogin() {
    console.log("Starting envelope login initialization...");

    const envelopeContainer = document.getElementById("envelope-container");
    const mainContent = document.getElementById("main-content");
    const secretCodeInput = document.getElementById("secret-code");
    const openLetterBtn = document.getElementById("open-letter");
    const errorMessage = document.getElementById("error-message");
    const envelope = document.querySelector(".envelope");

    console.log("Found elements:", {
      envelopeContainer: !!envelopeContainer,
      mainContent: !!mainContent,
      secretCodeInput: !!secretCodeInput,
      openLetterBtn: !!openLetterBtn,
      errorMessage: !!errorMessage,
      envelope: !!envelope,
    });

    if (!secretCodeInput || !openLetterBtn) {
      console.error("Required elements are missing!");
      return;
    }

    const SECRET_CODE = "050825";
    console.log("Secret code set to:", SECRET_CODE);

    secretCodeInput.addEventListener("input", function (e) {
      console.log("Input changed:", this.value);

      this.value = this.value.replace(/\D/g, "");

      if (errorMessage) {
        errorMessage.classList.remove("show");
      }

      if (this.value.length === 6) {
        console.log("6 digits entered, auto-checking...");
        setTimeout(() => checkCode(), 300);
      }
    });

    secretCodeInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        console.log("Enter key pressed");
        checkCode();
      }
    });

    openLetterBtn.addEventListener("click", function () {
      console.log("Open letter button clicked");
      checkCode();
    });

    function checkCode() {
      const enteredCode = secretCodeInput.value.trim();
      console.log(
        "Checking code:",
        enteredCode,
        "against SECRET_CODE:",
        SECRET_CODE
      );

      if (enteredCode === SECRET_CODE) {
        console.log("✅ Code is CORRECT! Opening envelope...");
        openEnvelope();
      } else {
        console.log("❌ Code is WRONG!");
        showError();
      }
    }

    function openEnvelope() {
      console.log("Opening envelope animation starting...");

      secretCodeInput.style.borderColor = "#28a745";
      secretCodeInput.style.boxShadow = "0 0 15px rgba(40, 167, 69, 0.3)";
      openLetterBtn.style.background =
        "linear-gradient(135deg, #28a745, #20c997)";
      openLetterBtn.textContent = "Opening...";

      if (envelope) {
        envelope.classList.add("opening");
      }

      createMagicalParticles();

      setTimeout(() => {
        console.log("Starting container transition...");

        if (envelopeContainer) {
          envelopeContainer.classList.add("opening");
        }

        setTimeout(() => {
          console.log("Hiding envelope and showing main content...");

          if (envelopeContainer) {
            envelopeContainer.classList.add("hidden");
          }
          if (mainContent) {
            mainContent.classList.add("revealed");
          }

          setTimeout(() => {
            console.log("Initializing main website...");
            initMainWebsite();
          }, 100);
        }, 1500);
      }, 800);
    }

    function showError() {
      console.log("Showing error message...");

      if (errorMessage) {
        errorMessage.classList.add("show");
      }

      if (envelope) {
        envelope.style.animation = "shake 0.5s ease-in-out";
      }

      secretCodeInput.style.borderColor = "#dc3545";
      secretCodeInput.style.boxShadow = "0 0 15px rgba(220, 53, 69, 0.3)";

      setTimeout(() => {
        secretCodeInput.value = "";
        secretCodeInput.focus();
        secretCodeInput.style.borderColor = "#ff9a9e";
        secretCodeInput.style.boxShadow = "none";
        if (envelope) {
          envelope.style.animation = "envelopeFloat 3s ease-in-out infinite";
        }
      }, 1500);
    }

    function createMagicalParticles() {
      console.log("Creating magical particles...");
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          const particle = document.createElement("div");
          particle.innerHTML = ["💕", "✨", "💖", "🌸", "💝"][
            Math.floor(Math.random() * 5)
          ];
          particle.style.cssText = `
            position: fixed;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            font-size: ${Math.random() * 20 + 15}px;
            pointer-events: none;
            z-index: 9999;
            animation: magicalFloat 3s ease-out forwards;
          `;

          document.body.appendChild(particle);

          setTimeout(() => particle.remove(), 3000);
        }, i * 100);
      }
    }

    setTimeout(() => {
      if (secretCodeInput) {
        secretCodeInput.focus();
        console.log("Input focused");
      }
    }, 500);
  }

  function initMainWebsite() {
    console.log("Initializing main website functionality...");

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });

    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector(".hero");
      if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
      }
    });

    const title = document.querySelector(".main-title");
    if (title) {
      const titleText = title.textContent;
      title.textContent = "";

      let i = 0;
      function typeWriter() {
        if (i < titleText.length) {
          title.textContent += titleText.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      }

      setTimeout(typeWriter, 500);
    }

    const photoFrames = document.querySelectorAll(".photo-frame");
    photoFrames.forEach((frame, index) => {
      frame.style.animationDelay = `${index * 0.2}s`;
      frame.style.animation = "float 3s ease-in-out infinite";
    });

    photoFrames.forEach((frame) => {
      frame.addEventListener("click", function () {
        alert("Smile ka lang lagi, love! Mahal kita! 📸❤️");
      });
    });

    document.addEventListener("mousemove", function (e) {
      createSparkle(e.clientX, e.clientY);
    });

    function createSparkle(x, y) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.cssText = `
              position: fixed;
              left: ${x}px;
              top: ${y}px;
              width: 4px;
              height: 4px;
              background: #ff6b6b;
              border-radius: 50%;
              pointer-events: none;
              z-index: 1000;
              animation: sparkleAnim 1s ease-out forwards;
          `;

      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    }

    const style = document.createElement("style");
    style.textContent = `
          @keyframes sparkleAnim {
              0% {
                  opacity: 1;
                  transform: scale(0) rotate(0deg);
              }
              100% {
                  opacity: 0;
                  transform: scale(1) rotate(180deg);
              }
          }
          
          @keyframes float {
              0%, 100% {
                  transform: translateY(0px);
              }
              50% {
                  transform: translateY(-10px);
              }
          }
      `;
    document.head.appendChild(style);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    document.querySelectorAll("section").forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(50px)";
      section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      observer.observe(section);
    });

    const promiseCard = document.querySelector(".promise-card");
    if (promiseCard) {
      promiseCard.addEventListener("click", function () {
        createHeartExplosion(this);
      });
    }

    function createHeartExplosion(element) {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          createFlyingHeart(centerX, centerY);
        }, i * 50);
      }
    }

    function createFlyingHeart(x, y) {
      const heart = document.createElement("div");
      heart.innerHTML = "❤️";
      heart.style.cssText = `
              position: fixed;
              left: ${x}px;
              top: ${y}px;
              font-size: 20px;
              pointer-events: none;
              z-index: 1000;
              animation: flyHeart 2s ease-out forwards;
          `;

      const angle = Math.random() * 360;
      const distance = 100 + Math.random() * 100;
      const endX = x + Math.cos((angle * Math.PI) / 180) * distance;
      const endY = y + Math.sin((angle * Math.PI) / 180) * distance;

      heart.style.setProperty("--endX", endX + "px");
      heart.style.setProperty("--endY", endY + "px");

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 2000);
    }

    const heartStyle = document.createElement("style");
    heartStyle.textContent = `
          @keyframes flyHeart {
              0% {
                  opacity: 1;
                  transform: translateX(0) translateY(0) scale(1);
              }
              100% {
                  opacity: 0;
                  transform: translateX(var(--endX, 100px)) translateY(var(--endY, -100px)) scale(0.5);
              }
          }
      `;
    document.head.appendChild(heartStyle);

    setTimeout(() => {
      const message = document.createElement("div");
      message.innerHTML = "Made with love by Jaren 💝";
      message.style.cssText = `
              position: fixed;
              bottom: 20px;
              right: 20px;
              background: rgba(255, 255, 255, 0.9);
              padding: 10px 20px;
              border-radius: 25px;
              font-size: 14px;
              color: #d63384;
              font-weight: 600;
              box-shadow: 0 4px 15px rgba(0,0,0,0.1);
              animation: slideInRight 0.5s ease-out;
              z-index: 1000;
          `;

      const slideStyle = document.createElement("style");
      slideStyle.textContent = `
              @keyframes slideInRight {
                  from {
                      opacity: 0;
                      transform: translateX(100px);
                  }
                  to {
                      opacity: 1;
                      transform: translateX(0);
                  }
              }
          `;
      document.head.appendChild(slideStyle);
      document.body.appendChild(message);

      setTimeout(() => {
        message.style.animation = "slideOutRight 0.5s ease-out forwards";
        setTimeout(() => message.remove(), 500);
      }, 5000);
    }, 3000);
  }
});

const style = document.createElement("style");
style.textContent = `
  @keyframes magicalFloat {
    0% {
      opacity: 1;
      transform: scale(0) rotate(0deg);
    }
    100% {
      opacity: 0;
      transform: scale(1) rotate(360deg);
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`;
document.head.appendChild(style);
