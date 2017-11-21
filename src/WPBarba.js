import Barba from 'barba.js';

class WPBarba {
  static handleActiveCSSClass(link) {
    if (link.href === location.href) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  }

  static deactivateWpAdminLinks() {
    [...document.querySelectorAll('a[href*="/wp-"]')].forEach((link) => {
      link.classList.add('no-barba');
    });
  }

  static resetScroll() {
    return new Promise((resolve) => {
      scroll(0, 0);
      setTimeout(resolve, 25);
    });
  }

  constructor({
    pageloadFunctions = [],
    wrapperId = 'main-wrapper',
    containerClass = 'main',
    navLinkSelector,
  }) {
    this.handlePageload = this.handlePageload.bind(this);
    this.setActivePage = this.setActivePage.bind(this);

    this.pageloadFunctions = [WPBarba.deactivateWpAdminLinks]
      .concat(pageloadFunctions)
      .concat([this.setActivePage]);
    this.navLinkSelector = navLinkSelector;
    this.wrapperId = wrapperId;
    this.containerClass = containerClass;
  }

  run() {
    this.handlePageload();

    Barba.Prefetch.init();
    Barba.Pjax.Dom.wrapperId = this.wrapperId;
    Barba.Pjax.Dom.containerClass = this.containerClass;
    Barba.Pjax.start();

    this.runPageLoadListeners();
  }

  handlePageload() {
    this.pageloadFunctions.forEach((func) => {
      func();
    });
  }

  runPageLoadListeners() {
    Barba.Dispatcher.on('newPageReady', () => {
      WPBarba.deactivateWpAdminLinks();
      WPBarba.resetScroll().then(this.handlePageload);
    });
  }

  setActivePage() {
    if (this.navLinkSelector) {
      this.pageLinks = this.pageLinks || document.querySelectorAll(this.navLinkSelector);

      [...this.pageLinks].forEach(WPBarba.handleActiveCSSClass);
    }
  }
}

export default WPBarba;
