const SNACKBAR_TIMEOUT = 3 * 1000;

export const showSnackbar = (snackbarText) => {
    const snackbarWrapper = document.getElementById('snackbarWrapper')
    snackbarWrapper.className = 'show';

    const snackbar = document.getElementById('snackbar')
    snackbar.innerHTML = snackbarText;

    setTimeout(() => {
        snackbarWrapper.className = snackbarWrapper.className.replace('show', '');
    }, SNACKBAR_TIMEOUT);
};

export const scrollUp = () => {
  scroll(0, 0); // eslint-disable-line
};
