

import './App.css';

import LiveTable from './components/LiveTable';
// import Table from './components/Table';
import Table2 from './components/Table2';

function App() {
  return (
    <>
    <h3 style={{'text-align':'center'}}>Top 5 Gainers and Losers just before 4h candle close
      </h3>
       
    {/* <Table prop='gl'/> */}
    {/* <LiveTable/> */}
    
   <Table2 index='1'/>
   <Table2 index='2'/>
   <Table2 index='3'/>
  //  <Table2 index='4'/>
    </>
  );
}

export default App;
