# wp-barba-page-preloader

Barba.js wrapper for WordPress. Prefetches pages for faster load times. Specify a wrapper around the
content that should change; everything outside this wrapper (e.g. your header and footer) stays
static between page navigations.

## Install

```
npm install wp-barba-page-preloader
```

OR

```
yarn add wp-barba-page-preloader
```

## Usage

In your WordPress template files:

```HTML
<div id="main-wrapper"><!-- Everything outside this wrapper stays between page navigations. -->
  <main class="main"><!-- Is replaced on page navigation with the content from the next page. -->
    This content changes on page navigation.
  </main>
</div>
```

In your WordPress theme's Javascript:

```
import initBarba from 'wp-barba-page-preloader';

window.addEventListener('load', () => {
  initBarba({
    pageloadFunctions: [],
    wrapperId: 'main-wrapper',
    containerClass: 'main',
    navLinkSelector: 'my-nav-links'
  });
});
```

### The settings object.

| Key               | Type   | Required | Description                                                                                                                                                                  | Default      |
| ----------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| pageloadFunctions | array  | false    | An array of functions to run after each page navigation.                                                                                                                     | []           |
| wrapperId         | string | true     | The ID of an HTML wrapper around our main content area. Everything outside this container will stay static between page navigations. This ID must be in your template files. | main-wrapper |
| containerClass    | string | true     | A CSS class attached to the HTML element that is replaced on page navigation. The CSS class must be present in your template files.                                          | main         |
| navLinkSelector   | string | false    | A string to select in-site navigation links that exist outside the wrapper. An `active` CSS class will be added to any selected link corresponding to the current page URL.  |              |

## Warnings/Issues/To-Dos

-The Edit Post/Page link in the WP admin bar is not updated when navigating to a new page. One
workaround is to hide that link with the `admin_bar_menu` hook and place the edit post link in a
prominent position within the post.
