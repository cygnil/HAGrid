# About

This is a response to a coding project whose parameters were to create a grid with a pluggable cell architecture for easy development of new cell types using React, TypeScript, and Node.js. It also required the data to be loaded from a back-end server whose source was included in the same repository.

Further, at least one cell type had to be a compact display of users with avatars and names, allowing for multiple users but also gracefully handling overflow. Overflowed users must be shown in a tooltip.

The users must also be editable with an autocomplete-style interface for picking users, and the user information fetched from the back-end server included in the repo.

Finally, components should be memoized where necessary and the table should be able to handle large datasets.

## Assumptions

* We assume that the list of users will be small enough that fetching them all initially will not incur too much of a hit.

* We assume that the amount of data in the grid will not be prohibitive for loading at app startup.

* We assume all data returned by the back-end is valid and we don't need to sanitize loaded values on the front-end

* We assume no off-page updates need to be propagated to the grid (e.g. seeing other users updating data in near-real time)

* We assume no data contained in this table is secure or consequential, so no need to implement HTTPS

* We assume no hardening against CSS, injection, or any other type of attack, either on the front- or back-end

# Quickstart

You can view an implementation of this (although without persistent edits across page refreshes) at [https://ha-grid.vercel.app/](https://ha-grid.vercel.app/)

You can view the Storybook of this project at [https://ha-grid-storybook.vercel.app/](https://ha-grid-storybook.vercel.app/)

# Installation

You'll need to install both the front-end and back-end components, i.e.

```
$ npm install; cd server; npm install
```

This will deposit you in the directory for the back-end server, so make sure you `cd ..` if you need to come back to the front-end code.

# Use

## Development

For development, first you'll need to start the back-end server, i.e.

```
$ cd server; npm run dev
```

Then, in a separate terminal, run the front-end code:

```
$ npm run dev
```

## Deployment

To get a bundle that can be deployed to any server, run `npm run build` which will generate a bundle in the `dist` directory for you to deploy to any server. Note that prior to this you will have to edit the back-end server values in `config.json`

## Storybook

If you want to see the Storybook documentation, all you need to do is run

```
$ npm run storybook
```

and a new browser tab will be automatically launched with Storybook running. This is completely self-contained and does not require any back-end to be running.

# About the Grid

Normally I would have used the excellent [TanStack Table](https://tanstack.com/table/latest) which would give us easy sorting, filtering, cell resize, and all sorts of other great things for free, but that seemed against the spirit of the assignment ("Design and implement a pluggable system for custom cell renderers") so I regretfully had to passs on it.

One particularly great thing about TanStack Table which this implmentation can't do is handle extremely large amounts of data. Because TanStack is virtualized, it can let users speedily scroll through tens or hundreds of thousands of rows. The tradeoff is that it has to render the table rows as divs instead of the more WCAG-friendly table/tr/td paradigm, but for most modern web applications this is perfectly fine.

## Adding new Cell Types

To add a new cell type, create a new component directory in `src/coponents/Cells` and export a component to render your content. When you've finished, go to `src/components/Cells/index.tsx` and import the cell, then add it to the list of cellTypes, along with the string that will be used to indicate the new cell in the grid definition, e.g. 

```
  const cellTypes : Record<string, any> = {
    ...
    string: StringCell,
    latlong: LatLongCell,
    newCell: YourNewCell
  };
```

After that, you should be able to use your cell type in the grid definition without trouble!

# About the User Editor

The user editor is a little different than a standard autocomplete. We have the challenge of allowing the user to both and new and remove existing users, which seem like similar operations logically but are different operations conceptually. What I mean by this is that when adding a new user, most of hte entries that show up in the autocomplete will probably be unknown to the user and seeing full name and profile information will be useful. However, when removing a user, most of existing users will be familiar to the user performing the operation, likely by avatar only--so the name is less useful, and can be eliminated from prominent display (although we still provide the name on hover). This frees up a lot of space when showing existing users in the cell. Additionally, adding users tends to be more common than removing them, so the focus of the interaction should be on that operation.

All this led me to think of displaying the users in compact form above the autocomplete box, and filling in users based on the filter below the autocomplete. Clicking on any user will flip their state--added or removed--with the update going to the server immediately. For more efficient processing, I would send the update only when the popup was closed (or maybe add a "Save" button) and batch the user updates for the row into one call with multiple edits.

# Performance Notes

The heaviest-weight component is the users cell, and this could get unwieldy with a lot of users. If a cell has hundreds of users, for example, the tooltip would get quickly overwhelmed, and rending that many components might incur a performance hit.

For large data sets or user sets, the initial load is quite heavy and the UI stalls noticeably. We could mitigate this by iterative loading of subsets of the data, allowing the UI to keep chugging along in the meantime. This would increase the load time, of course, but be a smoother overal experience.

# Explanation of Choices

I used [Material UI](https://mui.com/material-ui/) due to its prevalence, robustness, and its light approach to styling which allows for basic elements to look good out of the box but offers no strong opinions about how elements should look other than that. Additionally, the closeness of its components to the underlying HTML elements (e.g. TextField is very close in shape and use to and HTML input) means they can be dropped in without requiring a larger framework to be set up.

[Vite](https://vite.dev/) provided a quick and easy setup of React, with a robust dev server and sensible defaults. The largest competitor, [Create React App](https://create-react-app.dev/), strikes me as too heavyweight for this application as it includes webpack and instead of native modules. Vite also does seem much faster, although I'm sure that can be remedied by some sensible webpack tweaks in CRA.

As for [Storybook](https://storybook.js.org/), I can't say enough good things about this--it's literally the best tool for live component documentation that I've used. It can be a little cumbersome with large component libraries, but the flexibility, robustness, and developer-friendliness is worth it.

Similarly, [ESLint](https://eslint.org/) is a wonderful tool to pair with the safety of TypeScript, checking syntax and saving me literally hours during this sevelopment by catching errors early. I've heard good things about its competitor [Biome](https://biomejs.dev/), but as I've never used it before I didn't feel like this wa the time to start.

For sorting users in the user editor, I used my favorite flexible sorting library [natsort](https://www.npmjs.com/package/natsort) which has the most senisble, no-fuss defaults I've seen for sorting data with mixtures of letters, numbers, and capitalization. No more sort operations resulting in [10, 11, 8, 9]!

# Future Improvements

Obviously, one of the most useful improvements would be to add row selection, sorting, filtering, and column customization to the grid--all the trappings of a real data grid.

After that, in order of personal priority, I'd like to see:
* Instead of fetching all users at app load, fetch only users displayed in the table, and then send calls to fetch only users matching the filter in the user editor--assume that users could number in the tens of thousands or more, and behave accordingly
* Add better server communication and storage of side effects--ideally looking at something like GraphQL to make it easy
* Heavier-weight state management system such as redux
* Cache users from previous loads
* Polling the server for user updates - normally I prefer SSE, but with potentially tens of thousands of users that would be impractical to load every time someone changed their name or avatar
* I think server-side events (or websockets!) would be appropriate with more stable data like project names, however. Implementing web sockets for those updates would be wonderful.
* Creation/deletion of rows from the table
* Batch actions--batch update multiple cells of a column, perhaps!
* Run a real database behind the server
* A cell type to generate an inline line graph from a series of data points would be potentialy very useful. Good for performance, stock market graphs, load, or any number of other application
* Improved styling - I didn't spend very long with the styling of these components, opting for the default MUI theming, but there's a lot that could be done to improve the look and feel of the grid
* WCAG compliance
* Localization - take this grid international!
* Dark mode/dim mode
