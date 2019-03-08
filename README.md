# Chess clock

## The task: Chess Clock SPA (Vue.js).
* There should be 2 pages:
  * Page 1:
    - Remaining time for each player is displayed.
    - Time ticks for Player1. Timer for Player 2 is paused.
  * Page 2:
    - Remaining time for each player is displayed.
    - Timer for Player 1 is paused. Time ticks for Player2.
* Routing: one could open Page 1 or Page 2 using URL.
* When browsing to the root URL ('/'), Page 1 should appear.
* Every Page should have a button to switch turns (and so - to switch the Pages).
* After switching Pages, time should continue ticking from the moment it was stopped before.
* Starting time for every Player: 2 minutes.
* Time display format: mm.ss.000

## Install
```
npm install
```

## Test
```
npm run test
```

## Run
```
npm start
```
It gives you an URL, open it in browser.

## Build
```
npm run build
```
Builds with Webpack.
Result is in `/dist` folder.
