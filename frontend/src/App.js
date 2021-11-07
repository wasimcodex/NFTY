import { BrowserRouter as Router, Route } from 'react-router-dom'

import CreateNft from './components/CreateNft'
import Collections from './components/Collections'
import CustomNav from './components/Nav'
import Bank from './components/Bank'
import { NewBank } from './components/NewBank'

function App() {
  return (
    <div>
      <Router>
        <CustomNav />
        <Route path="/" exact>
          <CreateNft />
        </Route>
        <Route path="/collections">
          <Collections />
        </Route>
        <Route path="/bank">
          <NewBank />
        </Route>
      </Router>
    </div>
  )
}

export default App
