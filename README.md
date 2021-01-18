# Adobe.com React Review Component
A collection of components used to populate product review information on adobe.com

# Main Pieces
There are two main parts to this project:

## Components
1. `Review` - A component used to display review data.
2. `HelixReview` - Used to wrap `Review` and handle GET and POST requests of Helix-based data.

## Development
1. Using Parcel
   1. Clone this repo.
   2. Type `npm install` to install npm dependencies.
   3. Type `npm run dev` to run a Parcel dev server.
2. Using Helix
   1. Clone this repo.
   2. Install the Helix CLI if you haven't already: `npm i -g @adobe/helix-cli`
   2. Type `npm install` to install npm dependencies.
   3. Type `npm run hlx` to run a Helix dev server.

### Test validation on commit

To have the build and tests automatically verified on commit, run the following command to enable the pre-commit hook:

`git config core.hooksPath .githooks`

Note that if you already have hooks setup in your `.git/hooks` directory those will need to be moved to `./githooks`
