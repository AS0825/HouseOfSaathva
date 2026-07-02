/* =========================================================
   HOUSE OF SAATHVA — MAIN JS
   Handles: mobile nav, scroll reveal, FAQ accordion,
   story filter, contact form submission
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
    // close menu when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
    });
  }

  /* ---------- Scroll reveal animation ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      // Close all others (single-open accordion). Comment out the loop
      // below if you want multiple FAQs open at once.
      faqItems.forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---------- Stories filter (stories.html) ---------- */
  const filterTags = document.querySelectorAll('.filter-tag');
  const storyCards = document.querySelectorAll('[data-category]');
  if (filterTags.length && storyCards.length) {
    filterTags.forEach(tag => {
      tag.addEventListener('click', () => {
        filterTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        const filter = tag.dataset.filter;
        storyCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------- Contact form submission ---------- */
  /* This uses Formspree as a free no-backend form handler.
     STEP FOR INTERN:
     1. Go to https://formspree.io and create a free account.
     2. Create a new form, copy the form endpoint (looks like
        https://formspree.io/f/xxxxxxx).
     3. Replace YOUR_FORMSPREE_ID below in contact.html's form action.
     This script just handles the success/error message display. */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const statusEl = document.getElementById('form-status');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          statusEl.textContent = "Thank you. We've received your story and will be in touch within 24 hours.";
          statusEl.className = 'form-status success';
          contactForm.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        statusEl.textContent = "Something went wrong. Please email us directly or try again.";
        statusEl.className = 'form-status error';
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  /* ---------- Sticky header shrink on scroll (optional polish) ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.style.boxShadow = '0 2px 14px rgba(61,17,25,0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  /* ---------- Tagline scroll sequence (homepage "Where Love Outlives
     Time" section). Each .time-line starts dim/blurred. As it crosses
     the centre of the viewport it becomes .in-focus (fully sharp);
     once a later line takes focus, earlier lines settle to a soft
     .settled dim rather than disappearing — like a memory that's been
     seen and now rests. The final gold line (.time-final) just needs
     to enter view once and stays. ---------- */
  const timeLines = document.querySelectorAll('.time-line');
  const timeFinal = document.querySelector('.time-final');

  if (timeLines.length && 'IntersectionObserver' in window) {
    const lineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-focus');
          entry.target.classList.remove('settled');
        } else {
          // Only settle (don't re-dim) lines the user has scrolled past
          if (entry.target.classList.contains('in-focus') && entry.boundingClientRect.top < 0) {
            entry.target.classList.remove('in-focus');
            entry.target.classList.add('settled');
          }
        }
      });
    }, { threshold: 0.6, rootMargin: '-10% 0px -10% 0px' });

    timeLines.forEach(line => lineObserver.observe(line));
  } else {
    timeLines.forEach(line => line.classList.add('in-focus'));
  }

  if (timeFinal) {
    if ('IntersectionObserver' in window) {
      const finalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            timeFinal.classList.add('in-focus');
            finalObserver.unobserve(timeFinal);
          }
        });
      }, { threshold: 0.6 });
      finalObserver.observe(timeFinal);
    } else {
      timeFinal.classList.add('in-focus');
    }
  }

});
