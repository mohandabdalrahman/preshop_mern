import React from 'react';
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './screens/Home'
import ProductScreen from './screens/ProductScreen'
import { Route, Switch } from 'react-router-dom'
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={ProductScreen} />
            <Route exact path="/cart/:id?" component={CartScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/profile" component={ProfileScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
