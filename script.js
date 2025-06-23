// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all components
    initNavigation()
    initScrollAnimations()
    initSmoothScrolling()
    initMobileMenu()
    initTabs()
    initForms()
  
    // Load dynamic content
    loadProducts()
    loadBlogPosts()
  })
  
  // Navigation functionality
  function initNavigation() {
    const navbar = document.getElementById("navbar")
    const navLinks = document.querySelectorAll(".nav-link")
  
    // Navbar scroll effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  
    // Active link highlighting
    window.addEventListener("scroll", () => {
      let current = ""
      const sections = document.querySelectorAll("section[id]")
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        if (scrollY >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  }
  
  // Scroll animations using Intersection Observer
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated")
  
          // Stagger animations for child elements
          const children = entry.target.querySelectorAll(".stagger-animation")
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add("animated")
            }, index * 100)
          })
        }
      })
    }, observerOptions)
  
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
      ".fade-in-up, .fade-in-left, .fade-in-right, .animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right",
    )
    animatedElements.forEach((el) => {
      observer.observe(el)
    })
  }
  
  // Smooth scrolling for anchor links
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          const offsetTop = target.offsetTop - 80 // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    })
  }
  
  // Mobile menu functionality
  function initMobileMenu() {
    const mobileToggle = document.getElementById("mobile-toggle")
    const navMenu = document.getElementById("nav-menu")
  
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      mobileToggle.classList.toggle("active")
  
      // Animate hamburger icon
      const spans = mobileToggle.querySelectorAll("span")
      spans.forEach((span, index) => {
        if (navMenu.classList.contains("active")) {
          if (index === 0) span.style.transform = "rotate(45deg) translate(5px, 5px)"
          if (index === 1) span.style.opacity = "0"
          if (index === 2) span.style.transform = "rotate(-45deg) translate(7px, -6px)"
        } else {
          span.style.transform = "none"
          span.style.opacity = "1"
        }
      })
    })
  
    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        mobileToggle.classList.remove("active")
        const spans = mobileToggle.querySelectorAll("span")
        spans.forEach((span) => {
          span.style.transform = "none"
          span.style.opacity = "1"
        })
      })
    })
  }
  
  // Tab functionality
  function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabPanes = document.querySelectorAll(".tab-pane")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetTab = button.getAttribute("data-tab")
  
        // Remove active class from all buttons and panes
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabPanes.forEach((pane) => pane.classList.remove("active"))
  
        // Add active class to clicked button and corresponding pane
        button.classList.add("active")
        document.getElementById(targetTab).classList.add("active")
      })
    })
  }
  
  // Form handling
  function initForms() {
    const contactForm = document.getElementById("contact-form")
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault()
        handleContactForm(this)
      })
    }
  
    // Loyalty form
    const loyaltyForm = document.getElementById("loyalty-form")
    if (loyaltyForm) {
      loyaltyForm.addEventListener("submit", function (e) {
        e.preventDefault()
        handleLoyaltySignup(this)
      })
    }
  
    // Newsletter form
    const newsletterForm = document.querySelector(".newsletter-form")
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault()
        handleNewsletterSignup(this)
      })
    }
  }
  
  // Handle contact form submission
  function handleContactForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML
  
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
    submitBtn.disabled = true
  
    // Simulate form submission
    setTimeout(() => {
      showNotification("Thank you! Your message has been sent successfully. We'll get back to you soon!", "success")
      form.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  }
  
  // Handle loyalty program signup
  function handleLoyaltySignup(form) {
    const formData = new FormData(form)
    const submitBtn = form.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML
  
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Joining...'
    submitBtn.disabled = true
  
    // Simulate signup process
    setTimeout(() => {
      showNotification("Welcome to Sweet Rewards! You've earned 100 bonus points!", "success")
      form.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
  
      // Show welcome modal or redirect
      showLoyaltyWelcome()
    }, 2000)
  }
  
  // Handle newsletter signup
  function handleNewsletterSignup(form) {
    const email = form.querySelector('input[type="email"]').value
    const submitBtn = form.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML
  
    if (!email) {
      showNotification("Please enter a valid email address.", "error")
      return
    }
  
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'
    submitBtn.disabled = true
  
    // Simulate subscription
    setTimeout(() => {
      showNotification("Thank you for subscribing! Check your email for exclusive offers.", "success")
      form.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 1500)
  }
  
  // Show loyalty welcome message
  function showLoyaltyWelcome() {
    const welcomeHTML = `
          <div class="loyalty-welcome-modal" id="loyalty-welcome">
              <div class="loyalty-welcome-content">
                  <div class="welcome-icon">🎉</div>
                  <h3>Welcome to Sweet Rewards!</h3>
                  <p>You've successfully joined our loyalty program and earned <strong>100 bonus points</strong>!</p>
                  <div class="welcome-benefits">
                      <div class="benefit-item">
                          <i class="fas fa-gift"></i>
                          <span>100 Bonus Points</span>
                      </div>
                      <div class="benefit-item">
                          <i class="fas fa-percentage"></i>
                          <span>5% Off Every Purchase</span>
                      </div>
                      <div class="benefit-item">
                          <i class="fas fa-birthday-cake"></i>
                          <span>Birthday Surprise</span>
                      </div>
                  </div>
                  <button class="btn btn-primary" onclick="closeLoyaltyWelcome()">Start Shopping</button>
              </div>
          </div>
      `
  
    document.body.insertAdjacentHTML("beforeend", welcomeHTML)
    setTimeout(() => {
      document.getElementById("loyalty-welcome").classList.add("active")
    }, 100)
  }
  
  // Close loyalty welcome modal
  function closeLoyaltyWelcome() {
    const modal = document.getElementById("loyalty-welcome")
    if (modal) {
      modal.classList.remove("active")
      setTimeout(() => {
        modal.remove()
      }, 300)
    }
    scrollToSection("products")
  }
  
  // Parallax effect
  function initParallax() {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll(".parallax")
  
      parallaxElements.forEach((element) => {
        const speed = element.dataset.speed || 0.5
        const yPos = -(scrolled * speed)
        element.style.transform = `translateY(${yPos}px)`
      })
    })
  }
  
  // Utility functions
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId)
    if (section) {
      const offsetTop = section.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }
  
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `
  
    document.body.appendChild(notification)
  
    // Show notification
    setTimeout(() => {
      notification.classList.add("show")
    }, 100)
  
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove()
        }
      }, 300)
    }, 5000)
  }
  
  // Add notification styles
  const notificationStyles = `
    .notification {
      position: fixed;
      top: 100px;
      right: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      z-index: 3000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      max-width: 400px;
    }
    
    .notification.show {
      transform: translateX(0);
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
    }
    
    .notification-success {
      border-left: 4px solid #10b981;
    }
    
    .notification-error {
      border-left: 4px solid #ef4444;
    }
    
    .notification-info {
      border-left: 4px solid #3b82f6;
    }
    
    .notification-success i {
      color: #10b981;
    }
    
    .notification-error i {
      color: #ef4444;
    }
    
    .notification-info i {
      color: #3b82f6;
    }
    
    .notification-close {
      background: none;
      border: none;
      cursor: pointer;
      color: #6b7280;
      margin-left: auto;
    }
    
    .loyalty-welcome-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    
    .loyalty-welcome-modal.active {
      opacity: 1;
      visibility: visible;
    }
    
    .loyalty-welcome-content {
      background: white;
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      max-width: 500px;
      width: 90%;
      transform: translateY(20px);
      transition: transform 0.3s ease;
    }
    
    .loyalty-welcome-modal.active .loyalty-welcome-content {
      transform: translateY(0);
    }
    
    .welcome-icon {
      font-size: 4rem;
      margin-bottom: 20px;
    }
    
    .welcome-benefits {
      display: flex;
      justify-content: space-around;
      margin: 30px 0;
      flex-wrap: wrap;
      gap: 20px;
    }
    
    .benefit-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      color: var(--primary-color);
    }
    
    .benefit-item i {
      font-size: 1.5rem;
    }
    
    .benefit-item span {
      font-size: 0.875rem;
      font-weight: 600;
    }
  `
  
  // Inject notification styles
  const styleSheet = document.createElement("style")
  styleSheet.textContent = notificationStyles
  document.head.appendChild(styleSheet)
  
  // Mobile menu styles
  const mobileMenuStyles = `
    @media (max-width: 1024px) {
      .nav-menu {
        position: fixed;
        top: 80px;
        left: 0;
        width: 100%;
        background: white;
        flex-direction: column;
        padding: 2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
      
      .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
      
      .nav-link {
        padding: 1rem 0;
        border-bottom: 1px solid var(--border-light);
      }
      
      .nav-link:last-child {
        border-bottom: none;
      }
    }
  `
  
  // Inject mobile menu styles
  const mobileStyleSheet = document.createElement("style")
  mobileStyleSheet.textContent = mobileMenuStyles
  document.head.appendChild(mobileStyleSheet)
  
  // Preloader
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader")
    if (preloader) {
      preloader.style.opacity = "0"
      setTimeout(() => {
        preloader.style.display = "none"
      }, 500)
    }
  
    // Trigger page load animations
    document.body.classList.add("loaded")
  })
  
  // Utility functions
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
  
  // Optimize scroll events
  const optimizedScrollHandler = debounce(() => {
    // Handle scroll events here
  }, 16) // ~60fps
  
  window.addEventListener("scroll", optimizedScrollHandler)
  
  // Lazy loading for images
  function initLazyLoading() {
    const images = document.querySelectorAll("img[data-src]")
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })
  
    images.forEach((img) => imageObserver.observe(img))
  }
  
  // Initialize lazy loading
  initLazyLoading()
  // Particle animation
  function initParticles() {
    const hero = document.querySelector(".hero")
    if (!hero) return
  
    const particlesContainer = document.createElement("div")
    particlesContainer.className = "particles"
    hero.appendChild(particlesContainer)
  
    function createParticle() {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.animationDuration = Math.random() * 3 + 2 + "s"
      particle.style.animationDelay = Math.random() * 2 + "s"
      particlesContainer.appendChild(particle)
  
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentElement) {
          particle.remove()
        }
      }, 8000)
    }
  
    // Create particles periodically
    setInterval(createParticle, 300)
  }
  
  // Load products dynamically
  function loadProducts() {
    // Simulate loading products from an API
    setTimeout(() => {
      const productContainer = document.getElementById("product-list")
      if (productContainer) {
        productContainer.innerHTML = `
                  <div class="product-item">
                      <h3>Delicious Cupcake</h3>
                      <p>A classic treat for any occasion.</p>
                  </div>
                  <div class="product-item">
                      <h3>Chocolate Brownie</h3>
                      <p>Rich and decadent, perfect for chocolate lovers.</p>
                  </div>
              `
      }
    }, 1000)
  }
  
  // Load blog posts dynamically
  function loadBlogPosts() {
    // Simulate loading blog posts from an API
    setTimeout(() => {
      const blogContainer = document.getElementById("blog-posts")
      if (blogContainer) {
        blogContainer.innerHTML = `
                  <div class="blog-post">
                      <h3>Top 5 Dessert Trends of 2024</h3>
                      <p>Discover the latest trends in the dessert world.</p>
                  </div>
                  <div class="blog-post">
                      <h3>The Art of Baking</h3>
                      <p>Tips and tricks for creating perfect baked goods.</p>
                  </div>
              `
      }
    }, 1200)
  }
  
  // Smooth scroll behavior
  document.documentElement.style.scrollBehavior = "smooth"
