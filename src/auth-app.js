import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomeScreen } from './screens/home/home.screen';
import { PlayerScreen } from './screens/player/player.screen';
import { NotFoundScreen } from './screens/not-found/not-found.screen';

function AuthApp() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route path="/player/:movieId">
          <PlayerScreen />
        </Route>
        <Route path="*">
          <NotFoundScreen />
        </Route>
      </Switch>
    </>
  );
}

export default AuthApp;
