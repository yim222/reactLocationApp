import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {Locations} from '../entities/location/components/Locations'
import {Categories} from '../entities/category/components/Categories'
import {Location} from '../entities/location/components/Location'




const MainRouter = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Locations}/>
      <Route path='/locations' component={Locations}/>
      <Route path='/categories' component={Categories}/>

    </Switch>
  </main>
)

export default MainRouter
