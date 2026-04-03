# Copilot Instructions for NamesTech Portfolio

## Project Overview

This is a personal portfolio website for Nischal Pantha, a pilot and founder of NamesTech. The portfolio showcases professional experience, skills, projects, and contact information.

## Project Structure

- **Frontend**: HTML/CSS/JavaScript with modern animations
- **Backend**: Flask Python application
- **Styling**: Custom CSS with Tailwind-inspired utilities
- **Animations**: Anime.js library for dynamic effects
- **Deployment**: Ready for Flask web server

## Key Technologies

- **HTML5**: Semantic markup for portfolio content
- **CSS3**: Modern styling with CSS variables and gradients
- **JavaScript**: Interactive features and animations
- **Python Flask**: Backend server for routing and form handling
- **Anime.js**: Animation library for dynamic effects

## Project Guidelines

### Code Style
- Use consistent indentation (2 spaces for CSS/JS, 4 spaces for Python)
- Follow semantic HTML conventions
- Use CSS custom properties for consistent theming
- Keep JavaScript modular and event-driven

### Features to Maintain
- Smooth scroll behavior and page transitions
- Loading screen with smooth hide animation
- Responsive design for all screen sizes
- Dark theme with blue accent colors
- Interactive skill bars and project cards
- Smooth cursor follower effect
- Contact form with validation

### Best Practices
- Work through changes systematically
- Test changes in multiple browsers
- Maintain responsive design at all breakpoints
- Keep animations performant (60fps target)
- Document significant changes
- Follow existing naming conventions

### File Organization
- Keep static assets in `/static` directory
- HTML templates in `/templates` directory
- Python backend in root or `src` directory
- Style sheets organized by component
- Ensure all imports use correct relative paths

### Common Tasks
1. **Add a new section**: Create HTML in template, add CSS to styles-new.css, add animations if needed
2. **Update colors**: Modify CSS variables in `:root` selector
3. **Fix styling issues**: Check styles-new.css before adding new rules
4. **Test locally**: Use `python app.py` or appropriate Flask command
5. **Deploy**: Ensure all static assets are referenced correctly

### When Fixing Issues
- Verify all CSS is syntactically valid
- Check that animations don't cause performance issues
- Test responsive design on mobile devices
- Ensure accessibility features are maintained
- Validate form inputs and user interactions