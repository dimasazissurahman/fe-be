import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomePage } from './container/Home/Home';
import { NotFound } from './container/Error/404page';
import { SubscribePage } from './container/Subscribe/subscribe';
import { AppContext } from './component/provider/Provider';
import { useContext } from 'react';
import { AuthPage } from './container/Auth/Auth';
import { ProfilePage } from './container/Profile/Profile';

function App() {
  const { userData } = useContext(AppContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/subscribe" component={SubscribePage} />
          <Route path="/auth/page=:page" component={AuthPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
