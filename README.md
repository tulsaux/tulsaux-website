# tulsaux-website
Website for TulsaUX.com

## Compile SASS

1. Make sure you have SASS installed.

        $ sass -v

2. If you don't, install it here: [http://sass-lang.com/install](http://sass-lang.com/install)

3. Once installed, navigate to the CSS directory:

        $ cd assets/css

4. Run the following command to compile/watch the SCSS directory for changes.

        $ sass --watch scss/style.scss:style.css

*Note that this does not live reload the project.*
