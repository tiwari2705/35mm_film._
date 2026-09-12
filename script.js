/**
 * 35mm_film._ | Luxury Wedding Cinematography & Photography
 * Interactive Engine: Navigation, Lightbox, Filter, Cinema Modal & WhatsApp Integration
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Sticky Navigation & Scroll Effects ---
  const header = document.getElementById("header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    highlightActiveNav();
  }, { passive: true });

  function highlightActiveNav() {
    const scrollPos = window.scrollY + 140;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // --- 2. Mobile Drawer Navigation (390px Viewport) ---
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  function openDrawer() {
    mobileDrawer.classList.add("open");
    mobileMenuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    mobileDrawer.classList.remove("open");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", openDrawer);
  }
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener("click", closeDrawer);
  }
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  // --- 3. Portfolio Category Filtering ---
  const filterTabs = document.querySelectorAll(".filter-tab");
  const portfolioItems = document.querySelectorAll(".portfolio-item-card");

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filterVal = tab.getAttribute("data-filter");

      portfolioItems.forEach((card) => {
        const categories = card.getAttribute("data-category") || "";
        if (filterVal === "all" || categories.includes(filterVal)) {
          card.classList.remove("hide");
          card.style.opacity = "0";
          card.style.transform = "scale(0.96)";
          setTimeout(() => {
            card.style.transition = "all 0.35s ease";
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 30);
        } else {
          card.classList.add("hide");
        }
      });
    });
  });

  // --- 4. Portfolio Lightbox Modal ---
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");
  const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxMeta = document.getElementById("lightboxMeta");
  const lightboxPrevBtn = document.getElementById("lightboxPrevBtn");
  const lightboxNextBtn = document.getElementById("lightboxNextBtn");

  let currentImageIndex = 0;
  let activeCardsList = [];

  function updateActiveCards() {
    activeCardsList = Array.from(portfolioItems).filter(
      (card) => !card.classList.contains("hide")
    );
  }

  function showLightbox(index) {
    updateActiveCards();
    if (activeCardsList.length === 0) return;

    if (index < 0) {
      currentImageIndex = activeCardsList.length - 1;
    } else if (index >= activeCardsList.length) {
      currentImageIndex = 0;
    } else {
      currentImageIndex = index;
    }

    const card = activeCardsList[currentImageIndex];
    const imgSrc = card.getAttribute("data-img") || card.querySelector("img").src;
    const title = card.getAttribute("data-title") || "Wedding Still";
    const loc = card.getAttribute("data-location") || "Royal Destination";

    lightboxImg.src = imgSrc;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightboxMeta.textContent = loc;

    lightboxModal.classList.add("active");
    lightboxModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightboxModal.classList.remove("active");
    lightboxModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  portfolioItems.forEach((card, idx) => {
    card.addEventListener("click", () => {
      updateActiveCards();
      const currentFilteredIndex = activeCardsList.indexOf(card);
      showLightbox(currentFilteredIndex !== -1 ? currentFilteredIndex : idx);
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);
  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showLightbox(currentImageIndex - 1);
    });
  }
  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showLightbox(currentImageIndex + 1);
    });
  }

  // Keyboard navigation for Lightbox
  window.addEventListener("keydown", (e) => {
    if (!lightboxModal.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showLightbox(currentImageIndex - 1);
    if (e.key === "ArrowRight") showLightbox(currentImageIndex + 1);
  });



  // --- 6. WhatsApp Direct Booking & Form Integration (+91 9990722844) ---
  const weddingInquiryForm = document.getElementById("weddingInquiryForm");

  if (weddingInquiryForm) {
    weddingInquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const coupleNames = document.getElementById("coupleNames")?.value.trim() || "";
      const contactPhone = document.getElementById("contactPhone")?.value.trim() || "";
      const weddingDate = document.getElementById("weddingDate")?.value || "";
      const weddingLocation = document.getElementById("weddingLocation")?.value.trim() || "";
      const packageSelect = document.getElementById("packageSelect")?.value || "Premium Package (₹1,00,000)";
      const clientMessage = document.getElementById("clientMessage")?.value.trim() || "Looking forward to hearing from you.";

      // Construct formatted WhatsApp message
      const formattedMessage = `✨ *Wedding Inquiry for 35mm_film._* ✨\n\n` +
        `👤 *Couple Names:* ${coupleNames}\n` +
        `📱 *Contact Phone:* ${contactPhone}\n` +
        `📅 *Event Date:* ${weddingDate}\n` +
        `📍 *Venue / Destination:* ${weddingLocation}\n` +
        `💎 *Preferred Package:* ${packageSelect}\n\n` +
        `💬 *Vision & Details:*\n"${clientMessage}"\n\n` +
        `Please let us know your team's availability and next steps. Thank you!`;

      const whatsappURL = `https://wa.me/919990722844?text=${encodeURIComponent(formattedMessage)}`;

      // Open WhatsApp in new tab
      window.open(whatsappURL, "_blank", "noopener,noreferrer");

      // Optional form reset or feedback note
      const submitBtn = document.getElementById("submitInquiryBtn");
      if (submitBtn) {
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>Connecting to WhatsApp...</span>`;
        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
        }, 3000);
      }
    });
  }

  // --- 7. Legal Policy Modal Support ---
  const legalTriggers = document.querySelectorAll(".legal-modal-trigger");
  const legalModal = document.getElementById("legalModal");
  const legalModalBackdrop = document.getElementById("legalModalBackdrop");
  const legalModalCloseBtn = document.getElementById("legalModalCloseBtn");
  const legalModalContent = document.getElementById("legalModalContent");

  const legalTexts = {
    privacy: `
      <h3 style="font-family: var(--font-serif-display); font-size: 1.6rem; color: var(--gold-champagne); margin-bottom: 12px;">Privacy Policy</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: 14px;">
        At 35mm_film._, we uphold the highest standard of confidentiality and discretion for all our couples, families, and high-profile celebrations. We never sell, lease, or distribute private contact information.
      </p>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7;">
        Wedding imagery and cinematography are shared on portfolio channels strictly in coordination and mutual consent with our couples.
      </p>
    `,
    terms: `
      <h3 style="font-family: var(--font-serif-display); font-size: 1.6rem; color: var(--gold-champagne); margin-bottom: 12px;">Terms of Service & Booking</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: 14px;">
        1. <strong>Date Reservation:</strong> Dates are secured only upon receipt of the advance booking fee and signed agreement.
      </p>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: 14px;">
        2. <strong>Delivery Timelines:</strong> Teasers delivered within 7-10 working days. Full wedding films and high-resolution digital galleries delivered within 4-8 weeks.
      </p>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7;">
        3. <strong>Travel & Logistics:</strong> Travel and accommodation for destination weddings outside Delhi NCR are covered by the client.
      </p>
    `,
    copyright: `
      <h3 style="font-family: var(--font-serif-display); font-size: 1.6rem; color: var(--gold-champagne); margin-bottom: 12px;">Copyright & Heirloom Rights</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7;">
        All creative works, films, color gradings, and raw archival footage are copyright &copy; 2026 35mm_film._. Clients receive full non-commercial personal printing, digital sharing, and reproduction licenses for all delivered assets.
      </p>
    `
  };

  legalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const modalKey = trigger.getAttribute("data-modal");
      if (legalModalContent && legalTexts[modalKey]) {
        legalModalContent.innerHTML = legalTexts[modalKey];
        legalModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  function closeLegalModal() {
    if (legalModal) {
      legalModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (legalModalCloseBtn) legalModalCloseBtn.addEventListener("click", closeLegalModal);
  if (legalModalBackdrop) legalModalBackdrop.addEventListener("click", closeLegalModal);

  // --- 9. Instagram Reels Showcase Engine (Hover-to-Play & Click-to-Instagram) ---
  const instaReelsSlider = document.getElementById("instaReelsSlider");
  const reelsPrevBtn = document.getElementById("reelsPrevBtn");
  const reelsNextBtn = document.getElementById("reelsNextBtn");

  if (instaReelsSlider && typeof INSTAGRAM_REELS_DATA !== "undefined") {
    // Dynamically render all 7 Instagram Reels
    instaReelsSlider.innerHTML = INSTAGRAM_REELS_DATA.map((reel) => {
      const hasVideo = Boolean(reel.videoSrc);
      return `
        <article class="insta-reel-card ${hasVideo ? 'has-video' : ''}" data-reel-url="${reel.reelUrl}" tabindex="0" role="link" aria-label="Watch ${reel.couple} on Instagram">
          <!-- Story Progress Indicator -->
          <div class="reel-progress-track">
            <div class="reel-progress-fill"></div>
          </div>

          <!-- Video & Real Instagram Poster Media Layer -->
          <div class="reel-media-wrapper">
            <img src="${reel.poster}" alt="${reel.couple} - ${reel.title}" class="reel-poster-img" loading="lazy">
            ${hasVideo ? `<video class="reel-video-element" src="${reel.videoSrc}" muted loop playsinline preload="none"></video>` : ''}
            <div class="reel-sparkle-layer"></div>
          </div>

          <!-- Top Info Badges: Real Likes & Official IG Badge (No Fake Views) -->
          <div class="reel-top-badges">
            <div class="reel-likes-pill">
              <svg class="likes-heart-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>${reel.likes || 'Instagram Reel'}</span>
            </div>
            <div class="reel-ig-logo-badge" title="Watch on Instagram @35MM_film._">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
          </div>

          <!-- Center Hover Play HUD -->
          <div class="reel-center-hud">
            <div class="reel-play-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </div>
          </div>

          <!-- Bottom Gradient & Real Metadata -->
          <div class="reel-bottom-gradient"></div>
          <div class="reel-info-hud">
            <div class="reel-tags-row">
              <span class="reel-category-pill">${reel.category}</span>
              ${reel.collab ? `<span class="reel-collab-badge">@${reel.collab}</span>` : ''}
            </div>
            <h5 class="reel-couple-title">${reel.couple}</h5>
            <p class="reel-caption-text">${reel.title}</p>
            
            <div class="reel-audio-bar">
              <svg class="music-note-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
              <span class="reel-audio-title">${reel.audio}</span>
              <div class="reel-equalizer" aria-hidden="true">
                <span></span><span></span><span></span><span></span>
              </div>
            </div>

            <div class="reel-click-cta">
              <span>Watch on Instagram</span>
              <svg viewBox="0 0 20 20" fill="currentColor" class="cta-arrow">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </article>
      `;
    }).join("");

    // Setup Hover-to-Play and Click-to-Instagram listeners
    const reelCards = instaReelsSlider.querySelectorAll(".insta-reel-card");

    reelCards.forEach((card) => {
      const video = card.querySelector("video");
      const reelUrl = card.getAttribute("data-reel-url");

      // Mouse Enter / Hover -> Play
      card.addEventListener("mouseenter", () => {
        card.classList.add("is-playing");
        if (video) {
          video.currentTime = 0;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Auto-play prevented
            });
          }
        }
      });

      // Mouse Leave -> Pause & Reset
      card.addEventListener("mouseleave", () => {
        card.classList.remove("is-playing");
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });

      // Mobile Touch Support
      card.addEventListener("touchstart", () => {
        reelCards.forEach(c => {
          if (c !== card) {
            c.classList.remove("is-playing");
            const otherVid = c.querySelector("video");
            if (otherVid) otherVid.pause();
          }
        });
        card.classList.add("is-playing");
        if (video) video.play().catch(() => { });
      }, { passive: true });

      // Click -> Navigate to exact Instagram Reel URL in new tab
      card.addEventListener("click", () => {
        if (reelUrl) {
          window.open(reelUrl, "_blank", "noopener,noreferrer");
        }
      });

      // Keyboard Accessibility
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (reelUrl) {
            window.open(reelUrl, "_blank", "noopener,noreferrer");
          }
        }
      });
    });

    // Controls for Horizontal Slider
    if (reelsPrevBtn) {
      reelsPrevBtn.addEventListener("click", () => {
        instaReelsSlider.scrollBy({ left: -310, behavior: "smooth" });
      });
    }

    if (reelsNextBtn) {
      reelsNextBtn.addEventListener("click", () => {
        instaReelsSlider.scrollBy({ left: 310, behavior: "smooth" });
      });
    }
  }

  // --- 10. Back to Top Smooth Scroll ---
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

