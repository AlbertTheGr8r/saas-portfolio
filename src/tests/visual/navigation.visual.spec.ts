import { test, expect } from '@playwright/test'

test.describe('Navigation Bar Visual Tests', () => {
  test.describe('Homepage', () => {
    test('navbar is hidden on hero section', async ({ page }) => {
      await page.goto('/')
      
      // Wait for page to load
      await page.waitForLoadState('networkidle')
      
      // Take screenshot of top area
      await expect(page).toHaveScreenshot('homepage-hero-no-navbar.png', {
        clip: { x: 0, y: 0, width: 1280, height: 100 },
      })
    })

    test('navbar appears after scrolling past hero', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Scroll down past hero section
      await page.evaluate(() => window.scrollTo(0, 500))
      await page.waitForTimeout(300) // Wait for animation
      
      // Take screenshot of top area - navbar should be visible
      await expect(page).toHaveScreenshot('homepage-scrolled-navbar-visible.png', {
        clip: { x: 0, y: 0, width: 1280, height: 100 },
      })
    })

    test('full page at scroll position 0', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      await expect(page).toHaveScreenshot('homepage-full-scroll-0.png')
    })

    test('full page scrolled past hero', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      await page.evaluate(() => window.scrollTo(0, 500))
      await page.waitForTimeout(300)
      
      await expect(page).toHaveScreenshot('homepage-full-scrolled.png')
    })
  })

  test.describe('Blog Page', () => {
    test('navbar is always visible on blog index', async ({ page }) => {
      await page.goto('/blog')
      await page.waitForLoadState('networkidle')
      
      // Take screenshot of top area - navbar should be visible immediately
      await expect(page).toHaveScreenshot('blog-navbar-visible.png', {
        clip: { x: 0, y: 0, width: 1280, height: 100 },
      })
    })

    test('full blog page at top', async ({ page }) => {
      await page.goto('/blog')
      await page.waitForLoadState('networkidle')
      
      await expect(page).toHaveScreenshot('blog-full-page.png')
    })

    test('navbar remains visible when scrolling blog', async ({ page }) => {
      await page.goto('/blog')
      await page.waitForLoadState('networkidle')
      
      await page.evaluate(() => window.scrollTo(0, 300))
      await page.waitForTimeout(300)
      
      await expect(page).toHaveScreenshot('blog-scrolled-navbar-visible.png', {
        clip: { x: 0, y: 0, width: 1280, height: 100 },
      })
    })
  })

  test.describe('Projects Page', () => {
    test('navbar is always visible on projects index', async ({ page }) => {
      await page.goto('/projects')
      await page.waitForLoadState('networkidle')
      
      await expect(page).toHaveScreenshot('projects-navbar-visible.png', {
        clip: { x: 0, y: 0, width: 1280, height: 100 },
      })
    })

    test('full projects page at top', async ({ page }) => {
      await page.goto('/projects')
      await page.waitForLoadState('networkidle')
      
      await expect(page).toHaveScreenshot('projects-full-page.png')
    })
  })

  test.describe('Contact Page', () => {
    test('navbar is always visible on contact page', async ({ page }) => {
      await page.goto('/contact')
      await page.waitForLoadState('networkidle')
      
      await expect(page).toHaveScreenshot('contact-navbar-visible.png', {
        clip: { x: 0, y: 0, width: 1280, height: 100 },
      })
    })

    test('full contact page', async ({ page }) => {
      await page.goto('/contact')
      await page.waitForLoadState('networkidle')
      
      await expect(page).toHaveScreenshot('contact-full-page.png')
    })
  })

  test.describe('Blog Post Page', () => {
    test('navbar is always visible on blog post', async ({ page }) => {
      await page.goto('/blog/welcome')
      await page.waitForLoadState('networkidle')
      
      await expect(page).toHaveScreenshot('blog-post-navbar-visible.png', {
        clip: { x: 0, y: 0, width: 1280, height: 100 },
      })
    })

    test('full blog post page', async ({ page }) => {
      await page.goto('/blog/welcome')
      await page.waitForLoadState('networkidle')
      
      await expect(page).toHaveScreenshot('blog-post-full-page.png')
    })
  })

  test.describe('Project Detail Page', () => {
    test('navbar is always visible on project page', async ({ page }) => {
      await page.goto('/projects/saas-portfolio')
      await page.waitForLoadState('networkidle')
      
      await expect(page).toHaveScreenshot('project-detail-navbar-visible.png', {
        clip: { x: 0, y: 0, width: 1280, height: 100 },
      })
    })

    test('full project detail page', async ({ page }) => {
      await page.goto('/projects/saas-portfolio')
      await page.waitForLoadState('networkidle')
      
      await expect(page).toHaveScreenshot('project-detail-full-page.png')
    })
  })
})

test.describe('Theme Toggle Visual Tests', () => {
  test('theme toggle on homepage at top', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Take screenshot of top-right corner where toggle should be
    await expect(page).toHaveScreenshot('theme-toggle-homepage-top.png', {
      clip: { x: 1100, y: 0, width: 180, height: 100 },
    })
  })

  test('theme toggle when navbar is visible', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(300)
    
    // Theme toggle should be in navbar now
    await expect(page).toHaveScreenshot('theme-toggle-in-navbar.png', {
      clip: { x: 1100, y: 0, width: 180, height: 80 },
    })
  })

  test('theme toggle on blog page', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('theme-toggle-blog-page.png', {
      clip: { x: 1100, y: 0, width: 180, height: 80 },
    })
  })
})

test.describe('Responsive Visual Tests', () => {
  test('navbar on mobile homepage at top', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('mobile-homepage-top.png')
  })

  test('navbar on mobile blog page', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('mobile-blog-page.png')
  })
})

test.describe('Contrast and Visibility Tests', () => {
  test('navbar text contrast on dark background', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Scroll to position where navbar appears over content
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(300)
    
    // Take screenshot of navbar area to check text contrast
    await expect(page).toHaveScreenshot('navbar-contrast-check.png', {
      clip: { x: 0, y: 0, width: 1280, height: 80 },
    })
  })
})
