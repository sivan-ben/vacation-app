import React from 'react';
import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom'
import { AppRoutes } from './components/appRouters'
import { routes } from './components/appRouters/routers.config'
import ButtonAppBar from './components/nav';
import { useSelector } from 'react-redux'
import CircularIndeterminate from './components/loader'

function App() {

  const loading = useSelector((state: any) => state.userLoading);

  if (loading) return <CircularIndeterminate />;

  return (
    <div className="App">

      <BrowserRouter>
        <ButtonAppBar />
        <Switch>
          <AppRoutes routes={routes} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
